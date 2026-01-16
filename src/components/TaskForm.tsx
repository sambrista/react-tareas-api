import { useEffect, useState } from "react";
import type { Task } from "../types/Task";

type TaskFormProps = {
    anadirTarea : (titulo: string) => (void);
    editarTarea : (tarea: Task) => (void);
    cancelarEdicionTarea: () => (void);
    peticionEnProgreso: boolean;
    tareaSeleccionada: Task | null
}

function TaskForm({anadirTarea, peticionEnProgreso, tareaSeleccionada, editarTarea, cancelarEdicionTarea} : TaskFormProps ) {
    const [titulo, setTitulo] = useState(tareaSeleccionada?.title ?? "");

    useEffect(() => {
        setTitulo(tareaSeleccionada?.title ?? "")
    }, [tareaSeleccionada]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (titulo.trim().length > 0) {
            if (tareaSeleccionada != null) {
                const nuevaTarea : Task = {...tareaSeleccionada, title: titulo}
                editarTarea(nuevaTarea)
            } else {
                anadirTarea(titulo.trim())
            }
        }
    }

    return <>
    <h2>{tareaSeleccionada ? `Editar tarea: ${tareaSeleccionada.title}` : "Agregar nueva tarea"}</h2>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título de la tarea" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <button type="submit" disabled={peticionEnProgreso} >{ tareaSeleccionada ? "Editar" : "Agregar"}</button>{}
        { tareaSeleccionada && <button className="cancel" disabled={peticionEnProgreso} onClick={cancelarEdicionTarea}>Cancelar</button>}
    </form>
    </>;
}

export default TaskForm;