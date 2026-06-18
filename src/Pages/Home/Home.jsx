import { useState } from "react";
import "./Home.css";
import AveriasForm from "../Averias/AveriasForm";

const slides = [
  {
    title: "Reciclaje Semanal",
    subtitle:
      "Ayudá a mantener limpio nuestro sector con la recolección segura de residuos.",
    image:
      "https://img.magnific.com/vector-gratis/juego-clasificacion-basura_74855-15415.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Reciclaje semanal",
  },
  {
    title: "Reuniones Comunitarias",
    subtitle:
      "Participá en las juntas y compartí ideas para mejorar el servicio.",
    image:
      "https://static.vecteezy.com/system/resources/previews/005/273/305/non_2x/cartoon-character-with-business-people-discussing-together-in-conference-room-during-meeting-at-office-concept-of-teamwork-flat-icon-vector.jpg",
    alt: "Reunión comunitaria",
  },
];

const noticias = [
  {
    label: "Asamblea",
    titulo: "Próxima Asamblea General",
    fecha: "Mayo 2026",
    desc: "Se convoca a todos los abonados a la asamblea general ordinaria de la ASADA.",
    image:
      "https://images.pexels.com/photos/4666759/pexels-photo-4666759.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "Mantenimiento",
    titulo: "Mejoras en el Acueducto",
    fecha: "Abril 2026",
    desc: "Se realizaron trabajos de mantenimiento preventivo en la red de distribución.",
    image:
      "https://www.guanacastealaaltura.com/wp-content/uploads/2025/10/Finalizan-mejoras-al-acueducto-de-Montana-Grande-e-Isla-Venado-en-Lepanto.jpg",
  },
  {
    label: "Eventos",
    titulo: "Taller de Buenas Prácticas",
    fecha: "Junio 2026",
    desc: "Capacitación abierta para abonados sobre el uso y cuidado del agua.",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "Calidad",
    titulo: "Resultados de Calidad del Agua",
    fecha: "Marzo 2026",
    desc: "Los análisis de cloro y clarificación muestran resultados satisfactorios.",
    image:
      "https://www.doctoraconsolmontilla.com/wp-content/uploads/2016/10/la-importancia-de-la-calidad-del-agua.jpg",
  },
  {
    label: "Sostenibilidad",
    titulo: "Nueva Planta de Tratamiento",
    fecha: "Julio 2026",
    desc: "Avances en la planta para garantizar agua más limpia y un servicio más eficiente.",
    image: "https://accuaproduct.com/wp-content/uploads/2024/11/3.png",
  },
  {
    label: "Comunidad",
    titulo: "Jornada de Limpieza",
    fecha: "Agosto 2026",
    desc: "Vecinos unidos en una jornada de limpieza para cuidar nuestras fuentes de agua.",
    image:
      "https://www.lifeder.com/wp-content/uploads/2022/12/tipos-de-comunidad.jpg",
  },
];

const transparencia = [
  {
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    titulo: "Mediciones de Cloro",
    sub: "Calidad del Agua",
    desc: "Resultados de calidad del agua publicados con datos claros y accesibles para la comunidad.",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    titulo: "Informe Financiero",
    sub: "Finanzas",
    desc: "Detalle de ingresos y gastos para que todas las decisiones estén respaldadas.",
  },
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    titulo: "Actas de Junta",
    sub: "Gobernanza",
    desc: "Registro transparente de acuerdos y avances tomados en cada reunión de la ASADA.",
  },
  {
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    titulo: "Comunicados Oficiales",
    sub: "Comunicación",
    desc: "Avisos e información clave compartidos de forma oportuna con los usuarios.",
  },
];

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () =>
    setSlideIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const nextSlide = () =>
    setSlideIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="home-wrapper">
      {/* Hero */}
      <section id="inicio" className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">Sistema de Gestión ASADA</span>
          <h1>
            Tu ASADA
            <br />
            <span>más cerca que nunca</span>
          </h1>
          <p>Consultá, gestioná y mantenete informado desde un solo lugar</p>
          <div className="hero-actions">
            <a href="#avisos" className="hero-btn hero-btn--primary">
              Ver avisos
            </a>
            <a href="#averias" className="hero-btn hero-btn--outline">
              Reportar Avería
            </a>
          </div>
        </div>
      </section>

      {/* Avisos */}
      <section id="avisos" className="section avisos-section">
        <div className="section-header">
          <h2>Avisos Importantes</h2>
          <p>
            Mantente al tanto de las noticias más recientes sobre el servicio y
            la comunidad
          </p>
        </div>
        <div className="carousel">
          <button
            className="carousel-btn"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="carousel-slide">
            <img src={slides[slideIndex].image} alt={slides[slideIndex].alt} />
            <div className="carousel-info">
              <h3>{slides[slideIndex].title}</h3>
              <p>{slides[slideIndex].subtitle}</p>
            </div>
          </div>
          <button
            className="carousel-btn"
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M9 18l6-6-6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Noticias */}
      <section id="noticias" className="section noticias-section">
        <div className="section-header">
          <h2>Noticias de la Comunidad</h2>
          <p>Actividades, logros y novedades de nuestra ASADA</p>
        </div>
        <div className="noticias-grid">
          {noticias.map((n, i) => (
            <div
              className="noticia-card"
              key={i}
              style={{ backgroundImage: `url(${n.image})` }}
            >
              <div className="noticia-overlay" />
              <div className="noticia-content">
                <span className="noticia-label">{n.label}</span>
                <div className="noticia-body">
                  <span className="noticia-fecha">{n.fecha}</span>
                  <h3>{n.titulo}</h3>
                  <p>{n.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Averías — Formulario */}
      <section id="averias" className="section averias-section">
        <div className="section-header section-header--light">
          <h2>Control de Averías</h2>
          <p>Reportá las averías que encuentres en tu vivienda</p>
        </div>
        <div className="averias-form-container">
          <AveriasForm />
        </div>
      </section>

      {/* Transparencia */}
      <section id="transparencia" className="section transparencia-section">
        <div className="section-header">
          <h2>Transparencia</h2>
          <p>Compromiso con la gestión clara y accesible para la comunidad</p>
        </div>
        <div className="transparencia-grid">
          {transparencia.map((t, i) => (
            <div className="transparencia-card" key={i}>
              <div className="t-icon-wrap">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0d47a1"
                  strokeWidth="1.8"
                >
                  <path
                    d={t.icon}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="t-sub">{t.sub}</span>
              <h3>{t.titulo}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="section map-section">
        <div className="map-inner">
          <div className="map-card">
            <iframe
              title="Ubicación ASADA"
              src="https://www.google.com/maps?q=100mts+norte+de+la+Iglesia+Cat%C3%B3lica+de+Pueblo+Nuevo&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="contact-panel">
            <h3>Ubicación y contacto</h3>
            <div className="contact-line">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d47a1"
                strokeWidth="2"
              >
                <path
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  strokeLinecap="round"
                />
                <path
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeLinecap="round"
                />
              </svg>
              <span>100mts norte de la Iglesia Católica de Pueblo Nuevo</span>
            </div>
            <div className="contact-line">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d47a1"
                strokeWidth="2"
              >
                <path
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  strokeLinecap="round"
                />
              </svg>
              <span>8435-8518</span>
            </div>
            <a
              className="contact-btn"
              href="https://maps.app.goo.gl/C7K3WJa1Fp1hkTXn6"
              target="_blank"
              rel="noreferrer"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
