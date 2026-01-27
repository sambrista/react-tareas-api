import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
    /* TODO Obtener del contexto los datos y funciones necesarios */ 
    return (
        <div>
            <header className="navbar">
                <div className="navbar-inner">
                    <span className="brand">React Tareas</span>
                    <nav className="navlinks">
                        <NavLink to="/tasks">Tareas</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/profile">Perfil</NavLink>
                        {/* TODO: Mostrar login no ha iniciado sesión */}
                        <NavLink to="/login">Login</NavLink> 
                        {/* TODO: Si ha iniciado sesión, mostrar nombre y botón con clase nav-btn para cerrar sesión */}
                    </nav>
                </div>
            </header>

            <main className="page">
                <Outlet />
            </main>
        </div>
    );
}