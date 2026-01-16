import type { Task } from "../types/Task";

type TaskListProps = {
  tareas: Task[];
  cargando: boolean;
  peticionEnProgreso: boolean;
  borrarTarea: (tarea : Task) => void;
  setTareaSeleccionada: (tarea : Task) => void;
};

function TaskList({ tareas, cargando, peticionEnProgreso, setTareaSeleccionada, borrarTarea}: TaskListProps) {
  return (
    <>
      {cargando && <p>Cargando...</p>}
      {!cargando && (
        <ul>
          {tareas &&
            tareas.map((tarea) => (
              <li key={tarea.id} className={tarea.completed ? "completada"  :""}>
                { /* TODO: Poner ✅ si está completa*/}
                {tarea.title}{" "}
                { /* Mostrar botón completar si está incompleta */ }
                <button
                  disabled={peticionEnProgreso}
                  className="edit"
                  onClick={() => setTareaSeleccionada(tarea)}
                >
                  ✏️
                </button>
                <button
                  disabled={peticionEnProgreso}
                  className="delete"
                  onClick={() => borrarTarea(tarea)}
                >
                  ❌
                </button>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}

export default TaskList;