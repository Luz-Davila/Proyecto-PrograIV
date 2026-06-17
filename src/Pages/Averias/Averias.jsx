import { useEffect, useState } from "react";
import "./Averias.css";

// IMPORTANTE: Asegúrate de que este puerto (7098) coincida con el de tu IIS Express o Kestrel en Visual Studio.
const API_URL = "https://localhost:7098/api/averias";
async function fetchAverias() {
  try {
    const res = await fetch( API_URL,{
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} en el Backend`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo conectar con el servidor backend.", {
      cause: error,
    });
  }
}

async function saveAverias(nuevaAveria) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        nombre: nuevaAveria.nombre,
        tipoAveria: nuevaAveria.tipoAveria,
        descripcion: nuevaAveria.descripcion,
        estado: nuevaAveria.estado,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} al guardar en Backend`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo guardar la avería en el servidor backend.", {
      cause: error,
    });
  }
}

export default function Averias() {
  const [averias, setAverias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipoAveria, setTipoAveria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
 
    fetchAverias()
      .then(setAverias)
      .catch((error) => {
        console.error(error);
        setError(
          "No se pudieron cargar las averías. Verifica que el backend esté corriendo.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const averiaParaGuardar = {
      nombre,
      tipoAveria,
      descripcion,
      estado,
    };

    try {
      // El backend almacena en Supabase y nos retorna el registro con su ID real autoincremental
      const averiaGuardada = await saveAverias(averiaParaGuardar);
      setAverias([...averias, averiaGuardada]);

      // Limpieza de campos del formulario
      setNombre("");
      setTipoAveria("");
      setDescripcion("");
      setEstado("Pendiente");
    } catch (error) {
      console.error(error);
      setError(error.message || "Error al guardar en el backend.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="averias-container">
      <div className="averias-header">
        <h1>Módulo de Reporte de Averías</h1>
      </div>

      <div className="form-card">
        <h2>Formulario de Averías</h2>

        {error && (
          <div className="loading" style={{ color: "#c00" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo de Avería</label>
            <select
              value={tipoAveria}
              onChange={(e) => setTipoAveria(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="Fuga de agua">Fuga de agua</option>
              <option value="Tubería rota">Tubería rota</option>
              <option value="Sin agua">Sin agua</option>
              <option value="Medidor dañado">Medidor dañado</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              placeholder="Describa la avería"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Estado</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Resuelta">Resuelta</option>
            </select>
          </div>

          <button type="submit" className="btn-guardar" disabled={saving}>
            {saving ? "Guardando..." : "Guardar Avería"}
          </button>
        </form>
      </div>

      <div className="table-card">
        <h2>Lista de Averías</h2>

        {loading ? (
          <p className="loading">Cargando averías...</p>
        ) : averias.length === 0 ? (
          <p className="loading">No hay averías registradas.</p>
        ) : (
          <table className="tabla-averias">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {averias.map((averia) => (
                <tr key={averia.id}>
                  <td>{averia.id}</td>
                  <td>{averia.nombre}</td>
                  <td>{averia.tipoAveria}</td>
                  <td>{averia.descripcion}</td>
                  <td>{averia.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
