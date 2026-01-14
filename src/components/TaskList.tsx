import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/Task";

function TaskList() {
  const [tareas, setTareas] = useState<Task[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    taskService
      .getAll()
      .then((listaTareas) => {
        setTareas(listaTareas);
      })
      .finally(() => setCargando(false));
  }, []);

  function borrarTarea(idTarea : number) :void {
    alert(idTarea);
  }

  return (
    <>
      {cargando && <p>Cargando...</p>}
      {!cargando && (
        <ul>
          {tareas &&
            tareas.map((tarea) => <li key={tarea.id}>{tarea.title} <button className="edit" onClick={() => borrarTarea(tarea.id)}>❌</button></li>)}
        </ul>
      )}
    </>
  );
}

export default TaskList;
