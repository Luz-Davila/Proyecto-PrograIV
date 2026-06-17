import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../context/useAuth"; 
import "./Login.css";

export default function Login() {
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const { login } = useAuth();
    const navigate  = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("https://backend-proyecto.tryasp.net/login", {  
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (!res.ok) {
                setError("Credenciales incorrectas. Intentá de nuevo.");
                return;
            }

            const data = await res.json();   // { token: "eyJ..." }
            login(data.token);
            navigate({ to: "/dashboard" });

        } catch {
            setError("No se pudo conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                {/* Logo */}
                <div className="login-logo">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 3 C16 3 6 14 6 20 a10 10 0 0 0 20 0 C26 14 16 3 16 3Z" fill="#1565c0"/>
                        <path d="M16 10 C16 10 10 17 10 21 a6 6 0 0 0 12 0 C22 17 16 10 16 10Z" fill="rgba(13,71,161,0.3)"/>
                    </svg>
                    <span>SIAPB</span>
                </div>

                <h1 className="login-title">Iniciar sesión</h1>
                <p className="login-subtitle">Accedé al sistema de gestión ASADA</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="email">Usuario</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="admin"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button className="login-submit" type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>

                <a href="/" className="login-back">← Volver al inicio</a>
            </div>
        </div>
    );
}
