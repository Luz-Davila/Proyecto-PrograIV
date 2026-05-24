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
      "https://images.pexels.com/photos/4666759/pexels-photo-4666759.jpeg",
  },
  {
    label: "Mantenimiento",
    titulo: "Mejoras en el Acueducto",
    fecha: "Abril 2026",
    desc: "Se realizaron trabajos de mantenimiento preventivo en la red de distribución.",
    image:
      "https://www.guanacastealaaltura.com/wp-content/uploads/2025/10/Finalizan-mejoras-al-acueducto.jpg",
  },
];

const transparencia = [
  {
    emoji: "📄",
    titulo: "Mediciones de Cloro",
    sub: "Calidad del Agua",
    desc: "Resultados de calidad del agua publicados con datos claros y accesibles.",
  },
  {
    emoji: "📊",
    titulo: "Informe Financiero",
    sub: "Finanzas",
    desc: "Detalle de ingresos y gastos para transparencia total.",
  },
  {
    emoji: "📋",
    titulo: "Actas de Junta",
    sub: "Gobernanza",
    desc: "Registro de decisiones tomadas en reuniones.",
  },
  {
    emoji: "📣",
    titulo: "Comunicados",
    sub: "Comunicación",
    desc: "Información oficial compartida oportunamente.",
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

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Tu ASADA <span>más cerca que nunca</span></h1>
          <p>Consultá y gestioná desde un solo lugar</p>
        </div>
      </section>

      {/* CARRUSEL */}
      <section className="avisos-section">
        <h2>Avisos Importantes</h2>

        <div className="carousel">
          <button onClick={prevSlide}>‹</button>

          <div>
            <img src={slides[slideIndex].image} />
            <h3>{slides[slideIndex].title}</h3>
            <p>{slides[slideIndex].subtitle}</p>
          </div>

          <button onClick={nextSlide}>›</button>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="noticias-section">
        <h2>Noticias</h2>

        <div>
          {noticias.map((n, i) => (
            <div key={i}>
              <h3>{n.titulo}</h3>
              <p>{n.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ TRANSPARENCIA (ESTO ARREGLA EL ERROR) */}
      <section className="transparencia-section">
        <h2>Transparencia</h2>

        <div className="transparencia-grid">
          {transparencia.map((t, i) => (
            <div key={i} className="transparencia-card">
              <h3>{t.emoji} {t.titulo}</h3>
              <p><strong>{t.sub}</strong></p>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}