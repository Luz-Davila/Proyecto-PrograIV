import { useState } from "react";
import { Link } from "@tanstack/react-router";
import "./Navbar.css";

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
setIsOpen(!isOpen);
};

const menuItems = [
{ label: "INICIO", path: "#inicio" },
{ label: "AVISOS", path: "#avisos" },
{ label: "NOTICIAS", path: "#noticias" },
{ label: "TRANSPARENCIA", path: "#transparencia" },
{ label: "CONTACTO", path: "#contacto" },
];

return ( <nav className="navbar"> <div className="navbar-container">

      {/* Logo */}
      <Link
        to="/"
        className="navbar-logo"
        onClick={() => setIsOpen(false)}
      >
        <span className="logo-icon">💧</span>
        SIAPB
      </Link>

    {/* Botón hamburguesa */}
    <button
      className={`hamburger ${isOpen ? "active" : ""}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    {/* Menú Landing */}
    <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
      {menuItems.map((item) => (
        <li key={item.path} className="nav-item">
          <a
            href={item.path}
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>

    {/* Acceso al sistema */}
    <Link
      to="/dashboard"
      className="login-btn"
      onClick={() => setIsOpen(false)}
    >
      ACCEDER AL SISTEMA
    </Link>

  </div>
</nav>

);
};

export default Navbar;

