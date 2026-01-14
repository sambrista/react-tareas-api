import { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/Task";

function TaskList() {
  const [tareas, setTareas] = useState<Task[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [editando, setEditando] = useState<boolean>(false);

  useEffect(() => {
    taskService
      .getAll()
      .then((listaTareas) => {
        setTareas(listaTareas);
      })
      .finally(() => setCargando(false));
  }, []);

  function borrarTarea(idTarea : number) :void {
    setEditando(true);
    taskService.delete(idTarea).then(() => {
        setTareas(tareas.filter(tarea => tarea.id != idTarea))
        setEditando(false);
    })
  }

  return (
    <>
      {cargando && <p>Cargando...</p>}
      {!cargando && (
        <ul>
          {tareas &&
            tareas.map((tarea) => <li key={tarea.id}>{tarea.title} <button disabled={editando} className="delete" onClick={() => borrarTarea(tarea.id)}>❌</button></li>)}
        </ul>
      )}
    </>
  );
}

export default TaskList;
