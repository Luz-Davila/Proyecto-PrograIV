import { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import "./Averias.css";

function cleanValue(value) {
  return value
    ?.toString()
    .trim()
    .replace(/^["'\s]+|["'\s]+$/g, "")
    .replace(/\\\$/g, "$")
    .replace(/\\(["'])/g, "$1")
    .replace(/\\\\/g, "\\");
}

function getKey() {
  const candidates = [
    import.meta.env.VITE_JSONBIN_MASTER_KEY,
    import.meta.env.VITE_JSON_MASTER_KEY,
    import.meta.env.VITE_JSONBIN_KEY,
    import.meta.env.VITE_API_KEY,
  ];

  console.log("Variables ENV disponibles:", candidates);

  const raw = candidates.find((v) => v && v.trim() !== "");
  if (!raw) throw new Error("Falta la clave de JSONBin");

  const key = cleanValue(raw);
  console.log("KEY LIMPIA:", key);
  return key;
}

function getBinCandidates() {
  const candidates = [];

  const rawId = cleanValue(import.meta.env.VITE_BIN_ID);
  if (rawId) {
    candidates.push(`https://api.jsonbin.io/v3/b/${rawId}`);
  }

  const rawUrl = cleanValue(import.meta.env.VITE_JSONBIN_URL);
  if (rawUrl) {
    const base = rawUrl.replace(/\/+$/, "");
    if (!candidates.some((c) => c.includes(base))) {
      candidates.push(base);
    }
  }

  if (candidates.length === 0) {
    throw new Error("Falta la URL o el ID de JSONBin");
  }

  return candidates;
}

function getFetchUrls() {
  return getBinCandidates().flatMap((base) =>
    base.endsWith("/latest") ? [base] : [base, `${base}/latest`]
  );
}

function getSaveUrls() {
  return getBinCandidates();
}

async function fetchAverias() {
  const key = getKey();
  const urls = getFetchUrls();
  let lastError = null;

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { "X-Master-Key": key },
      });

      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} en ${url}`);
        continue;
      }

      const data = await res.json();
      const record = data.record ?? data;

      if (Array.isArray(record)) return record;
      if (record?.averias && Array.isArray(record.averias)) return record.averias;
      return [];
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("No se pudo obtener datos de JSONBin");
}

async function saveAverias(lista) {
  const key = getKey();
  let lastError = null;

  for (const url of getSaveUrls()) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": key,
        },
        body: JSON.stringify(lista),
      });

      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} en ${url}`);
        continue;
      }

      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("No se pudo guardar en JSONBin");
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
        setError("No se pudieron cargar las averías. Verifica la clave JSONBin y la conexión.");
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const nuevaAveria = {
      id: averias.length > 0 ? Math.max(...averias.map((a) => a.id)) + 1 : 1,
      nombre,
      tipoAveria,
      descripcion,
      estado,
    };

    const nuevaLista = [...averias, nuevaAveria];

    try {
      await saveAverias(nuevaLista);
      setAverias(nuevaLista);
      setNombre("");
      setTipoAveria("");
      setDescripcion("");
      setEstado("Pendiente");
    } catch (error) {
      console.error(error);
      setError("No se pudo guardar la avería. Revisa la clave JSONBin o la conexión.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout title="Control de Averías">
    <div className="averias-container">
      <div className="averias-header">
        <h1>Módulo de Reporte de Averías</h1>
      </div>

      <div className="form-card">
        <h2>Formulario de Averías</h2>

        {error && <div className="loading" style={{ color: "#c00" }}>{error}</div>}

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
</DashboardLayout>
  );
}