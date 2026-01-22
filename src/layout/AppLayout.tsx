import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <div>
            <header className="navbar">
                <div className="navbar-inner">
                    <span className="brand">React Tareas</span>
                    <nav className="navlinks">
                        <NavLink to="/tasks">Tareas</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/profile">Perfil</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </nav>
                </div>
            </header>

            <main className="page">
                <Outlet />
            </main>
        </div>
    );
}