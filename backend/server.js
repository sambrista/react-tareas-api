import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jsonServer from "json-server";

const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

const app = express();
app.use(cors());
app.use(express.json());

// Reutilizamos UN solo router/db (evita crear router("db.json") múltiples veces)
const router = jsonServer.router("db.json");
const db = router.db;

// --- helpers ---
function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });

  const token = header.slice("Bearer ".length);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

const userIdFromReq = (req) => Number(req.user?.sub);

function taskBelongsToUser(task, userId) {
  return task && Number(task.userId) === Number(userId);
}

// --- auth endpoints ---
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "email y password son obligatorios" });
  }

  const user = db.get("users").find({ email }).value();
  if (!user?.passwordHash) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = signToken(user);
  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

app.post("/auth/register", async (req, res) => {
  const { email, password, name } = req.body ?? {};
  if (!email || !password || !name) {
    return res.status(400).json({ message: "name, email y password son obligatorios" });
  }

  const exists = db.get("users").find({ email }).value();
  if (exists) return res.status(409).json({ message: "Email ya registrado" });

  const passwordHash = await bcrypt.hash(password, 10);

  const users = db.get("users");
  const nextId = (users.maxBy("id").value()?.id ?? 0) + 1;

  const newUser = {
    id: nextId,
    email,
    name,
    passwordHash
  };

  users.push(newUser).write();

  return res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name });
});

app.get("/auth/me", authRequired, (req, res) => {
  return res.json({
    id: req.user.sub,
    email: req.user.email,
    name: req.user.name
  });
});

/**
 * --- TASKS: acceso solo a tareas del usuario ---
 * En lugar de depender de filtros “mágicos” de json-server via req.query,
 * implementamos handlers Express limpios y dejamos json-server para el resto.
 */

app.get("/tasks", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const tasks = db.get("tasks").filter({ userId }).value();
  return res.json(tasks);
});

app.get("/tasks/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const task = db.get("tasks").find({ id }).value();
  if (!taskBelongsToUser(task, userId)) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json(task);
});

app.post("/tasks", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const { title, completed = false } = req.body ?? {};

  if (!title?.trim()) return res.status(400).json({ message: "title es obligatorio" });

  const tasks = db.get("tasks");
  const nextId = (tasks.maxBy("id").value()?.id ?? 0) + 1;

  const newTask = {
    id: nextId,
    title: title.trim(),
    completed: !!completed,
    userId
  };

  tasks.push(newTask).write();
  return res.status(201).json(newTask);
});

app.put("/tasks/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const task = db.get("tasks").find({ id }).value();
  if (!taskBelongsToUser(task, userId)) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, completed } = req.body ?? {};
  if (!title?.trim()) return res.status(400).json({ message: "title es obligatorio" });

  const updated = { ...task, title: title.trim(), completed: !!completed, userId }; // userId no cambia
  db.get("tasks").find({ id }).assign(updated).write();

  return res.json(updated);
});

app.patch("/tasks/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const task = db.get("tasks").find({ id }).value();
  if (!taskBelongsToUser(task, userId)) {
    return res.status(404).json({ message: "Task not found" });
  }

  const patch = {};
  if (req.body?.title !== undefined) {
    const t = String(req.body.title).trim();
    if (!t) return res.status(400).json({ message: "title no puede estar vacío" });
    patch.title = t;
  }
  if (req.body?.completed !== undefined) patch.completed = !!req.body.completed;

  // Bloqueo explícito: nunca permitir cambiar userId desde el cliente
  const updated = db.get("tasks").find({ id }).assign(patch).write();
  return res.json(updated);
});

app.delete("/tasks/:id", authRequired, (req, res) => {
  const userId = userIdFromReq(req);
  const id = Number(req.params.id);

  const task = db.get("tasks").find({ id }).value();
  if (!taskBelongsToUser(task, userId)) {
    return res.status(404).json({ message: "Task not found" });
  }

  db.get("tasks").remove({ id }).write();
  return res.status(204).send();
});

// --- json-server CRUD (resto de recursos) ---
const middlewares = jsonServer.defaults();
app.use(middlewares);

// IMPORTANTE: montamos json-server DESPUÉS, para que /tasks use nuestros handlers
app.use(router);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
