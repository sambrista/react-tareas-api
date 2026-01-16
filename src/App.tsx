import { useEffect, useState } from 'react';
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { taskService } from './services/taskService';
import type { Task } from './types/Task';

function App() {
  const [tareas, setTareas] = useState<Task[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [peticionEnProgreso, setPeticionEnProgreso] = useState<boolean>(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState<Task | null>(null);

  function borrarTarea(tareaObjetivo : Task) :void {
    setPeticionEnProgreso(true);
    taskService.delete(tareaObjetivo.id).then(() => {
        setTareas(tareas.filter(tarea => tarea.id != tareaObjetivo.id))
        setPeticionEnProgreso(false);
    })
  }

  function cancelarEdicionTarea() : void {
    setTareaSeleccionada(null);
  }

  function editarTarea(tareaObjetivo : Task) :void {
    setPeticionEnProgreso(true);
    taskService.update(tareaObjetivo).then(() => {
        setTareas(tareas.map(tarea => tarea.id == tareaObjetivo.id ? tareaObjetivo : tarea))
        setPeticionEnProgreso(false);
        cancelarEdicionTarea();
    })
    /*
    TODO: Hacer la petición de update con axios y, cuando termine, poner peticionEnProgreso a false, y tareaSeleccionada a null
    */
  }

  function anadirTarea(titulo : string) :void {
    setPeticionEnProgreso(true);
    taskService.create(titulo).then((nuevaTarea) => {
        setTareas([...tareas, nuevaTarea])
        setPeticionEnProgreso(false);
    })
  }

  useEffect(() => {
    taskService
      .getAll()
      .then((listaTareas) => {
        setTareas(listaTareas);
      })
      .finally(() => setCargando(false));
  }, []);
  
  return (
    <div>
      <h1>Lista de tareas</h1>
      <TaskList tareas={tareas} cargando={cargando} peticionEnProgreso={peticionEnProgreso} borrarTarea={borrarTarea} setTareaSeleccionada={setTareaSeleccionada} />
      <TaskForm anadirTarea={anadirTarea} peticionEnProgreso={peticionEnProgreso} tareaSeleccionada={tareaSeleccionada} editarTarea={editarTarea} cancelarEdicionTarea={cancelarEdicionTarea} />
    </div>
  )
}

export default App
