import { useNavigate } from "react-router-dom";
import type { Task } from "../types/Task";

type TaskListProps = {
  tareas: Task[];
  cargando: boolean;
  peticionEnProgreso: boolean;
  borrarTarea: (tarea : Task) => void;
  editarTarea: (tarea : Task) => void;
  setTareaSeleccionada: (tarea : Task) => void;
};

function TaskList({ tareas, cargando, peticionEnProgreso, setTareaSeleccionada, borrarTarea, editarTarea}: TaskListProps) {
  const navigate = useNavigate();
  function verTarea(tarea: Task) :void {
    navigate(`/tasks/${tarea.id}`);
  }
  return (
    <>
      {cargando && <p>Cargando...</p>}
      {!cargando && (
        <ul>
          {tareas &&
            tareas.map((tarea) => (
              <li key={tarea.id} className={tarea.completed ? "completada"  :""}>
                { tarea.completed && "✅ " }
                <span className="tituloTarea" onClick={() => {verTarea(tarea)}}>{tarea.title}</span>{" "}
                { !tarea.completed && (<button
                  disabled={peticionEnProgreso}
                  className="complete"
                  onClick={() => editarTarea({...tarea, completed: true})}
                >
                  ✅
                </button>)}
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
