import { Link, useParams } from "react-router-dom"

export default function TaskDetailPage() {
    const { id } = useParams<{ id: string }>();
    
    /* TODO: Usar el servicio para obtener la tarea */
    /* TODO: Si está cargando, devolver <section className="task-hero">Cargando...</section> no esté cargada la noticia, mostrar "Cargando..." */

    return (<section className="task-hero">
        <div className="task-hero-top">
            <Link className="link" to="/tasks">← Volver</Link>
            <span className="badge badge-ok"> {/* TODO: poner clase badge-ok o badge-pending dependiendo de si está completa o no" */}
            {/* TODO: Escribir COMPLETADA o PENDIENTE */}COMPLETADA</span>
        </div>
        <h1 className="task-hero-title">TITULO DE LA TAREA{/* TODO: Cambiar */}</h1>
        <p className="muted">ID: 6{/* TODO: Cambiar */}</p>
        
      <div className="task-hero-actions">
        {/* TODO: Añadir enlace para volver a la página /tasks con className "btn" con el texto "Ir a la lista" */}
      </div>
    </section>)
}