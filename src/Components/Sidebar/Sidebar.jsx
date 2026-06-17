import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import "./Sidebar.css";

const navItems = [
    { to: "/dashboard", label: "Panel",       icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { to: "/padron",    label: "Abonados",    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { to: "/averias",   label: "Averías",     icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
    { to: "/inventario",label: "Inventario",  icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { to: "/directorio",label: "Directorio",  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

export default function Sidebar({ collapsed, onToggle }) {
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;

    return (
        <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <svg viewBox="0 0 24 24" fill="#1565c0" className="brand-icon">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                        <path d="M12 2a10 10 0 00-3.5 19.37V17h-2v-2h2v-1.5c0-2.07 1.23-3.22 3.12-3.22.9 0 1.84.16 1.84.16v2h-1.04c-1.02 0-1.34.64-1.34 1.29V15h2.28l-.37 2h-1.91v4.37A10 10 0 0012 2z"/>
                    </svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2" className="brand-icon">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                        <path d="M12 6v6l4 2" strokeLinecap="round"/>
                    </svg>
                    {!collapsed && (
                        <div className="brand-text">
                            <span className="brand-name">SIAPB</span>
                            <span className="brand-sub">Sistema Administrativo</span>
                        </div>
                    )}
                </div>
                <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {collapsed
                            ? <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                            : <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                        }
                    </svg>
                </button>
            </div>

            <nav className="sidebar-nav">
                {navItems.map(({ to, label, icon }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`nav-item ${currentPath === to ? "nav-item--active" : ""}`}
                        title={collapsed ? label : ""}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="nav-icon">
                            <path d={icon} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {!collapsed && <span>{label}</span>}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}