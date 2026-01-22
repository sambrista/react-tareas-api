import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { taskService } from "../services/taskService";
import type { Task } from "../types/Task";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [cargando, setCargando] = useState<boolean>(true);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Task | undefined | null>(undefined)

  useEffect(() => {
    if (id) {
      taskService.get(parseInt(id)).then((tarea) => setTareaSeleccionada(tarea)).finally(() => setCargando(false))
    }
  }, [])

  if (!id) {
    return <p>No se ha proporcionado una ID</p>
  }
  if (tareaSeleccionada === null) {
    return <p>La tarea no existe</p>
  }
  return (<section className="task-hero">
    <div className="task-hero-top">
      <Link className="link" to="/tasks">← Volver</Link>
      {!cargando && tareaSeleccionada && <span className={tareaSeleccionada.completed ? "badge badge-ok" : "badge badge-pending"}> {/* TODO: poner clase badge-ok o badge-pending dependiendo de si está completa o no" */}
        {tareaSeleccionada.completed ? "COMPLETADA" : "PENDIENTE"}</span>}
    </div>
    {!cargando && tareaSeleccionada && <>
      <h1 className="task-hero-title">{tareaSeleccionada.title}</h1>
      <p className="muted">ID: {tareaSeleccionada.id}</p>
    </>

    }
    {cargando && <p>Cargando...</p>}
    <div className="task-hero-actions">
      <Link className="btn" to="/tasks">Ir a la lista</Link>
    </div>
  </section>)
}