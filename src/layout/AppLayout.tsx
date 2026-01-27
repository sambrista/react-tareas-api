import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function AppLayout() {
    const {isAuthenticated, user, logout } = useAuth();
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
                        { !isAuthenticated && <NavLink to="/login">Login</NavLink> }
                        { isAuthenticated && user && <span>{user.name} <button className="nav-btn" onClick={logout}>Logout</button></span> }
                    </nav>
                </div>
            </header>

            <main className="page">
                <Outlet />
            </main>
        </div>
    );
}