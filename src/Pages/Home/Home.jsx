import { useState } from "react";
import "./Home.css";

const slides = [
  {
    title: "Reciclaje Semanal",
    subtitle: "Ayuda a mantener limpio nuestro sector con la recolección segura de residuos.",
    image:
      "https://img.magnific.com/vector-gratis/juego-clasificacion-basura_74855-15415.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Reciclaje semanal",
  },
  {
    title: "Reuniones Comunitarias",
    subtitle: "Participa en las juntas y comparte ideas para mejorar el servicio.",
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
    image:
      "https://accuaproduct.com/wp-content/uploads/2024/11/3.png",
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
    emoji: "📄",
    titulo: "Mediciones de Cloro",
    sub: "Calidad del Agua",
    desc: "Resultados de calidad del agua publicados con datos claros y accesibles para la comunidad.",
  },
  {
    emoji: "📊",
    titulo: "Informe Financiero",
    sub: "Finanzas",
    desc: "Detalle de ingresos y gastos para que todas las decisiones estén respaldadas.",
  },
  {
    emoji: "📋",
    titulo: "Actas de Junta",
    sub: "Gobernanza",
    desc: "Registro transparente de acuerdos y avances tomados en cada reunión de la ASADA.",
  },
  {
    emoji: "📣",
    titulo: "Comunicados Oficiales",
    sub: "Comunicación",
    desc: "Avisos e información clave compartidos de forma oportuna con los usuarios.",
  },
];

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () =>
    setSlideIndex((current) => (current === 0 ? slides.length - 1 : current - 1));

  const nextSlide = () =>
    setSlideIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );

  return (
    <div className="home-wrapper">

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>
            Tu ASADA
            <br />
            <span>más cerca que nunca</span>
          </h1>
          <p>Consultá, gestioná y mantenete informado desde un solo lugar</p>
        </div>
      </section>

      {/* Avisos Importantes */}
      <section className="avisos-section">
        <div className="avisos-header">
          <h2>Avisos Importantes</h2>
          <p>Mantente al tanto de las noticias más recientes sobre sostenibilidad, reciclaje y actividades de la comunidad</p>
        </div>

        <div className="carousel">
          <button className="carousel-btn" type="button" onClick={prevSlide}>
            ‹
          </button>

          <div className="carousel-slide">
            <img
              src={slides[slideIndex].image}
              alt={slides[slideIndex].alt}
            />
            <div className="carousel-info">
              <h3>{slides[slideIndex].title}</h3>
              <p>{slides[slideIndex].subtitle}</p>
            </div>
          </div>

          <button className="carousel-btn" type="button" onClick={nextSlide}>
            ›
          </button>
        </div>
      </section>

      {/* Noticias */}
      <section className="noticias-section">
        <h2 className="section-title">Noticias de la Comunidad</h2>
        <div className="noticias-grid">
          {noticias.map((n, i) => (
            <div
              className="noticia-card"
              key={i}
              style={{ backgroundImage: `url(${n.image})` }}
            >
              <div className="noticia-card-overlay" />
              <div className="noticia-card-content">
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

      {/* Transparencia */}
      <section className="transparencia-section">
        <div className="transparencia-header">
          <h2>Transparencia</h2>
          <p className="transparencia-intro">Compromiso con la gestión clara y accesible para la comunidad.</p>
        </div>

        <div className="transparencia-grid">
          {transparencia.map((t, i) => (
            <div className="transparencia-card" key={i}>
              <div className="transparencia-emoji">{t.emoji}</div>
              <h3>{t.titulo}</h3>
              <div className="transparencia-sub">{t.sub}</div>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="map-contact-section">
        <div className="map-contact-inner">
          <div className="map-card">
            <iframe
              title="Ubicación ASADA Pueblo Nuevo"
              src="https://www.google.com/maps?q=100mts+norte+de+la+Iglesia+Cat%C3%B3lica+de+Pueblo+Nuevo&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="contact-panel">
            <h3>Ubicación y contacto</h3>
            <div className="contact-line">
              <span className="contact-label">Dirección:</span>
              <span>100mts norte de la Iglesia Católica de Pueblo Nuevo</span>
            </div>
            <div className="contact-line">
              <span className="contact-label">Teléfono:</span>
              <span>8435-8518 </span>
            </div>
            <a
              className="contact-button"
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