import { useState } from "react";
import type { Task } from "../types/Task";

type TaskFormProps = {
    anadirTarea : (titulo: string) => (void);
    editarTarea : (tarea: Task) => (void);
    editando: boolean;
    tareaEditable: Task | null
}

function TaskForm({anadirTarea, editando, tareaEditable, editarTarea} : TaskFormProps ) {
    const [titulo, setTitulo] = useState("");{/* TODO: Iniciar con el nombre de la tarea cuando se esté editando, sino en blanco */}

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (titulo.trim().length > 0) {
            if (tareaEditable != null) {
                const nuevaTarea : Task = {...tareaEditable, title: titulo}
                editarTarea(nuevaTarea)
            } else {
                anadirTarea(titulo.trim())
            }
        }
    }

    return <>
    <h2>Agregar nueva tarea</h2> {/* TODO: Cambiar a "Editar tarea: nombre_original_de_la_tarea" */}
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título de la tarea" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <button type="submit" disabled={editando} >Agregar</button>{/* TODO: Cambiar a "Editar" cuando se esté editando */}
        {/* TODO: Cuando se esté editando la tarea, añadir un botoncito de cancelar para poner editarTarea a null. Este botón deberá estar desactivado cuando haya una petición en curso */}
    </form>
    </>;
}

export default TaskForm;