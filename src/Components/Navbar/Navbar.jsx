import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import "./Navbar.css";

const menuItems = [
  { label: "Inicio",        href: "#inicio" },
  { label: "Avisos",        href: "#avisos" },
  { label: "Noticias",      href: "#noticias" },
  { label: "Averías",       href: "#averias" },
  { label: "Transparencia", href: "#transparencia" },
  { label: "Contacto",      href: "#contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [visible, setVisible]     = useState(true);
  const [scrolled, setScrolled]   = useState(false);
  const lastScrollY               = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(y < lastScrollY.current || y < 60);
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${visible ? "" : "navbar--hidden"}`}>
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <svg viewBox="0 0 32 32" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 3 C16 3 6 14 6 20 a10 10 0 0 0 20 0 C26 14 16 3 16 3Z" fill="white" opacity="0.95"/>
            <path d="M16 10 C16 10 10 17 10 21 a6 6 0 0 0 12 0 C22 17 16 10 16 10Z" fill="rgba(13,71,161,0.35)"/>
          </svg>
          <span className="logo-text">SIAPB</span>
        </Link>

        {/* Hamburguesa */}
        <button
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        {/* Menú */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          {menuItems.map(item => (
            <li key={item.href}>
              <a href={item.href} className="nav-link" onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to="/dashboard" className="login-btn" onClick={() => setIsOpen(false)}>
          Acceder al sistema
        </Link>

      </div>
    </nav>
  );
}