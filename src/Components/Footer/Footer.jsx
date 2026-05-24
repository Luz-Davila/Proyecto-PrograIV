import "./Footer.css";
import { Link } from "@tanstack/react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-container">
          {/* Sección Sobre Nosotros */}
          <div className="footer-section">
            <h3 className="footer-title">ASADA PUEBLO NUEVO</h3>
            <p className="footer-description">
              Comprometidos con la distribución de agua potable de calidad para nuestras comunidades.
            </p>
          </div>

          {/* Sección Enlaces Rápidos */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <a href="#padron">Padrón Abonados</a>
              </li>
              <li>
                <a href="#averias">Control Averías</a>
              </li>
              <li>
                <a href="#inventario">Inventario Bodega</a>
              </li>
            </ul>
          </div>

          {/* Sección Contacto */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Contacto</h4>
            <div className="footer-contact">
              <p>
                <span className="contact-label">📍</span>
                Pueblo Nuevo de Paquera, Puntarenas, Costa Rica
              </p>
              <p>
                <span className="contact-label">📞</span>
                +506 8435-8518
              </p>
              <p>
                <span className="contact-label">📧</span>
                asada.pueblo.nuevo@gmail.com
              </p>
            </div>
          </div>

          {/* Sección Horario */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Horario</h4>
            <ul className="footer-hours">
              <li>
                <span>Lunes - Viernes:</span>
                <span>8:00 AM - 5:00 PM</span>
              </li>
              <li>
                <span>Sábado:</span>
                <span>8:00 AM - 1:00 PM</span>
              </li>
              <li>
                <span>Domingo:</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} ASADA. Todos los derechos reservados.</p>
          <p className="footer-credits">Siempre dispuestos a servir</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
