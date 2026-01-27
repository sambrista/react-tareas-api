import { useAuth } from "../auth/authContext";

export default function ProfilePage() {

    const {user, isAuthenticated} = useAuth();

    return (<section className="card">
      <h1>Perfil</h1>

      {!isAuthenticated && <p className="muted">No hay sesión iniciada</p>}
      {isAuthenticated && user && (
        <div className="profile">
          <p><strong>Nombre:</strong>{user.name}</p>
          <p><strong>Email:</strong>{user.email}</p>
        </div>
      )}
      
    </section>);
}