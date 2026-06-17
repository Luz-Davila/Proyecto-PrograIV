import { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link, useNavigate } from "@tanstack/react-router";
import "./Dashboard.css";

const stats = [
    {
        label: "Abonados",
        value: 245,
        color: "#0d47a1",
        bg: "#e3f2fd",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
        label: "Averías",
        value: 12,
        color: "#c62828",
        bg: "#ffebee",
        icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    },
    {
        label: "Usuarios",
        value: 8,
        color: "#1b5e20",
        bg: "#e8f5e9",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
        label: "Inventario",
        value: 320,
        color: "#e65100",
        bg: "#fff3e0",
        icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    },
];

const quickLinks = [
    { to: "/padron",     label: "Padrón de Abonados",      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { to: "/averias",    label: "Control de Averías",       icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
    { to: "/inventario", label: "Inventario",               icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { to: "/directorio", label: "Directorio Administrativo",icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const fecha = new Date().toLocaleDateString("es-CR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const navigate = useNavigate();

    function handleLogout() {
        navigate({ to: "/" });
    }

    return (
        <div className="db-layout">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

            <div className={`db-content ${collapsed ? "db-content--expanded" : ""}`}>

                {/* Top bar */}
                <header className="db-topbar">
                  <div className="db-topbar-left">
                      <button className="db-menu-btn" onClick={() => setCollapsed(c => !c)} aria-label="Menú">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
                          </svg>
                      </button>
                      <h2 className="db-page-title">Panel Administrativo</h2>
                  </div>
                    <button className="db-logout" onClick={handleLogout}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Cerrar sesión
                    </button>
                </header>

                <main className="db-main">

                    {/* Hero */}
                    <section className="db-hero">
                        <div className="db-hero-text">
                            <div className="db-hero-icon">
                                <svg viewBox="0 0 24 24" fill="white">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                            </div>
                            <div>
                                <h1>Bienvenido al Sistema SIAPB</h1>
                                <p>Sistema Integral para la Administración de Acueductos y Padrón de Abonados</p>
                            </div>
                        </div>
                        <span className="db-hero-date">{fecha}</span>
                    </section>

                    {/* Stats */}
                    <section className="db-stats">
                        {stats.map(({ label, value, color, bg, icon }) => (
                            <div className="db-stat-card" key={label}>
                                <div className="db-stat-icon" style={{ background: bg }}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
                                        <path d={icon} strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="db-stat-info">
                                    <span className="db-stat-value" style={{ color }}>{value}</span>
                                    <span className="db-stat-label">{label}</span>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Quick links */}
                    <section className="db-section">
                        <h2 className="db-section-title">Accesos Rápidos</h2>
                        <div className="db-quick-grid">
                            {quickLinks.map(({ to, label, icon }) => (
                                <Link key={to} to={to} className="db-quick-card">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="db-quick-icon">
                                        <path d={icon} strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>{label}</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="db-arrow">
                                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Activity */}
                    <section className="db-section">
                        <h2 className="db-section-title">Actividad Reciente</h2>
                        <div className="db-empty">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#b0bec5" strokeWidth="1.5">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p>No hay actividad reciente registrada</p>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}