import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    function login(jwt) {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}