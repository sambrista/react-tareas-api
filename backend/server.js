import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import jsonServer from "json-server";

const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

const app = express();
app.use(cors());
app.use(express.json());

// --- helpers ---
function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "2h" });
}

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Missing token" });

  const token = header.slice("Bearer ".length);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// --- auth endpoints ---
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ message: "email y password son obligatorios" });

  // json-server router lee de db.json, pero aquí lo leemos como JSON “a mano”
  // (suficiente para práctica; no es producción)
  const db = jsonServer.router("db.json").db;
  const user = db.get("users").find({ email, password }).value();

  if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

  const token = signToken(user);
  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

app.get("/auth/me", authRequired, (req, res) => {
  return res.json({
    id: req.user.sub,
    email: req.user.email,
    name: req.user.name
  });
});

// --- protect /tasks ---
app.use("/tasks", authRequired);

// --- json-server CRUD ---
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use(middlewares);
app.use(router);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});