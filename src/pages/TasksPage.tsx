import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { taskService } from "../services/taskService";
import type { Task } from "../types/Task";

export default function TasksPage() {
  const [error, setError] = useState<string |null>(null);
  const [tareas, setTareas] = useState<Task[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [peticionEnProgreso, setPeticionEnProgreso] = useState<boolean>(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Task | null>(null);

  function borrarTarea(tareaObjetivo: Task): void {
    setPeticionEnProgreso(true);
    taskService.delete(tareaObjetivo.id).then(() => {
      setTareas((prev) => prev.filter((t) => t.id != tareaObjetivo.id));
      setPeticionEnProgreso(false);
    });
  }

  function cancelarEdicionTarea(): void {
    setTareaSeleccionada(null);
  }

  function editarTarea(tareaObjetivo: Task): void {
    setPeticionEnProgreso(true);
    taskService.update(tareaObjetivo).then(() => {
      setTareas((prev) => prev.map((t) => (t.id == tareaObjetivo.id ? tareaObjetivo : t)));
      setPeticionEnProgreso(false);
      cancelarEdicionTarea();
    });
  }

  function anadirTarea(titulo: string): void {
    setPeticionEnProgreso(true);
    taskService.create(titulo).then((nuevaTarea) => {
      setTareas((prev) => [...prev, nuevaTarea]);
      setPeticionEnProgreso(false);
    });
  }


  useEffect(() => {
    taskService
      .getAll()
      .then((listaTareas) => setTareas(listaTareas))
      .catch((respuestaErronea) => { setError(respuestaErronea.message + ": " + respuestaErronea.response.data.message)})
      .finally(() => setCargando(false));
  }, []);

  return (
    <section className="card">
      <h1>Lista de tareas</h1>

      <p className="muted">
        Consejo: haz click en el título para ver la tarea en “modo detalle”.
      </p>

      {/* Reutilizamos TaskList, pero le daremos click para detalle desde CSS/estructura en la siguiente iteración */}
      { !error && <>
      <TaskList
        tareas={tareas}
        cargando={cargando}
        peticionEnProgreso={peticionEnProgreso}
        borrarTarea={borrarTarea}
        setTareaSeleccionada={setTareaSeleccionada}
        editarTarea={editarTarea}
      /> 

      <TaskForm
        anadirTarea={anadirTarea}
        peticionEnProgreso={peticionEnProgreso}
        tareaSeleccionada={tareaSeleccionada}
        editarTarea={editarTarea}
        cancelarEdicionTarea={cancelarEdicionTarea}
      />
      </> }
      {error && <div className="toast error">{error}</div>}
    </section>
  );
}