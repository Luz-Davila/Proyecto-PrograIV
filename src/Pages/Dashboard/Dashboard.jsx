import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Dashboard.css";
import { Link } from "@tanstack/react-router";

export default function Dashboard() {
  const fecha = new Date().toLocaleDateString("es-CR");

  return (
    <>
    <Sidebar />

    <main className="dashboard">

      <section className="dashboard-hero">
        <h1>💧 Dashboard Administrativo</h1>
        <p>
          Sistema Integral para la Administración
          de Acueductos y Padrón de Abonados
        </p>

        <span className="dashboard-date">
          {fecha}
        </span>
      </section>

      <section className="stats-grid">

        <div className="stat-card">
          <div className="icon">👥</div>
          <h2>245</h2>
          <p>Abonados</p>
        </div>

        <div className="stat-card">
          <div className="icon">🔧</div>
          <h2>12</h2>
          <p>Averías</p>
        </div>

        <div className="stat-card">
          <div className="icon">🛡️</div>
          <h2>8</h2>
          <p>Usuarios</p>
        </div>

        <div className="stat-card">
          <div className="icon">📦</div>
          <h2>320</h2>
          <p>Inventario</p>
        </div>

      </section>

      <section className="quick-actions">

        <h2>Accesos Rápidos</h2>

        <div className="actions-grid">

          <Link to="/padron" className="action-card">
             Padrón de Abonados
          </Link>

          <Link to="/averias" className="action-card">
             Control de Averías
          </Link>

          <Link to="/inventario" className="action-card">
             Inventario
          </Link>

          <Link to="/directorio" className="action-card">
             Directorio Administrativo
          </Link>

        </div>

      </section>

      <section className="activity-panel">

        <h2>Actividad Reciente</h2>

        <ul>
          
        </ul>

      </section>

   </main>
</>
  );
}
