import { Link } from "@tanstack/react-router";
import "./Sidebar.css";

export default function Sidebar() {

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <h2>💧 SIAPB</h2>

        <span>
          Sistema Administrativo
        </span>

      </div>

      <nav>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/padron">
          Abonados
        </Link>

        <Link to="/averias">
          Averías
        </Link>

        <Link to="/inventario">
          Inventario
        </Link>

        <Link to="/directorio">
          Directorio
        </Link>

      </nav>

    </aside>
  );
}
