import { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import "./Averias.css";
import API_URL from "../../Lib/api";
//import AveriasForm from "./AveriasForm";


async function fetchAverias() {
  try {
    const res = await fetch(API_URL + "/api/averias", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line preserve-caught-error
    throw new Error("No se pudieron cargar los reportes.");
  }
}

export default function Averias() {
  // Estado de los reportes
  const [averias, setAverias] = useState([]);
  const [loadingReportes, setLoadingReportes] = useState(true);
  const [errorReportes, setErrorReportes] = useState("");

  useEffect(() => {
    fetchAverias()
      .then(setAverias)
      .catch((err) => {
        console.error(err);
        setErrorReportes("No se pudieron cargar los reportes de averías.");
      })
      .finally(() => setLoadingReportes(false));
  }, []);

  return (
    <DashboardLayout title="Control de Averías">
      <div className="averias-container">
        <div className="averias-header">
          <h1>Reportes de Averías del Sistema</h1>
          <p>Reporta y visualiza todos los reportes de avería creados</p>
        </div>
        {
          //<AveriasForm />
        }
        {/* LISTADO DE REPORTES */}
        <div className="reportes-averias">
          <div className="reportes-header">
            <h2>Reportes de Averías</h2>
            <p>Listado de todos los reportes de avería creados en el sistema</p>
          </div>

          {errorReportes && (
            <div className="error-message">{errorReportes}</div>
          )}

          {loadingReportes ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Cargando reportes de averías...</p>
            </div>
          ) : averias.length === 0 ? (
            <div className="empty-state">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>No hay reportes de averías registrados aún</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="averias-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {averias.map((averia) => (
                    <tr key={averia.id}>
                      <td className="id-cell">#{averia.id}</td>
                      <td>{averia.nombre}</td>
                      <td className="tipo-cell">{averia.tipoAveria}</td>
                      <td className="desc-cell">{averia.descripcion}</td>
                      <td className="estado-cell">
                        <span
                          className={`estado-badge estado-${averia.estado.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {averia.estado}
                        </span>
                      </td>
                      <td className="fecha-cell">
                        {averia.fechaCreacion
                          ? new Date(averia.fechaCreacion).toLocaleDateString(
                              "es-CR",
                            )
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
