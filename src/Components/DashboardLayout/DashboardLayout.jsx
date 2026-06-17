import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "@tanstack/react-router";
import "./DashboardLayout.css";

export default function DashboardLayout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dl-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

      <div className={`dl-content ${collapsed ? "dl-content--expanded" : ""}`}>

        {/* Topbar */}
        <header className="dl-topbar">
          <div className="dl-topbar-left">
            <button className="dl-menu-btn" onClick={() => setCollapsed(c => !c)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="dl-back-btn" onClick={() => navigate({ to: "/dashboard" })}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Volver al panel
            </button>
            <h2 className="dl-title">{title}</h2>
          </div>
          <button className="dl-logout" onClick={() => navigate({ to: "/" })}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Cerrar sesión
          </button>
        </header>

        <main className="dl-main">
          {children}
        </main>

      </div>
    </div>
  );
}