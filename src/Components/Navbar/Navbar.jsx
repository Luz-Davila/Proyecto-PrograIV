import { useState } from "react";
import { Link } from "@tanstack/react-router";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: "HOME", path: "/" },
    { label: "PADRÓN ABONADOS", path: "/padron" },
    { label: "CONTROL AVERÍAS", path: "/averias" },
    { label: "INVENTARIO BODEGA", path: "/inventario" },
    { label: "DIRECTORIO ADMINISTRATIVO", path: "/directorio" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Título */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">💧</span>
          SIAPB
        </Link>

        {/* Hamburger Button */}
        <button
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu Items */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className="nav-link"
                activeProps={{ className: "nav-link active" }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
