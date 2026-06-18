import { useState } from 'react';
import './Averias.css'
import API_URL from '../../Lib/api';



async function saveAverias(nuevaAveria) {
  try {
    const res = await fetch(API_URL + "/api/averias", {
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

const AveriasForm = () => {
    // Estado del formulario
      const [nombre, setNombre] = useState("");
      const [tipoAveria, setTipoAveria] = useState("");
      const [descripcion, setDescripcion] = useState("");
      const [estado, setEstado] = useState("Pendiente");
      const [errorForm, setErrorForm] = useState("");
      const [saving, setSaving] = useState(false);
      const [success, setSuccess] = useState("");



    
      // Manejar envío del formulario
      async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setErrorForm("");
        setSuccess("");
    
        const averiaParaGuardar = {
          nombre,
          tipoAveria,
          descripcion,
          estado,
        };
    
        try {
          await saveAverias(averiaParaGuardar);
          setSuccess("Avería reportada exitosamente");
          
          // Limpieza de campos del formulario
          setNombre("");
          setTipoAveria("");
          setDescripcion("");
          setEstado("Pendiente");
    
          // Limpiar el mensaje de éxito después de 3 segundos
          setTimeout(() => setSuccess(""), 3000);
        } catch (error) {
          console.error(error);
          setErrorForm(error.message || "Error al guardar en el backend.");
        } finally {
          setSaving(false);
        }
      }

      return (
        <>

       
         {/* FORMULARIO DE AVERÍAS */}
        <div className="formulario-averias">
          <div className="form-card">
            <h2>Reportar una Avería</h2>
            <p>Cuéntanos qué problema encontraste para que nuestro equipo pueda ayudarte rápidamente</p>

            {errorForm && (
              <div className="alert alert-error">
                {errorForm}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                {success}
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
                  placeholder="Describa la avería con detalles"
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
                {saving ? "Guardando..." : "Reportar Avería"}
              </button>
            </form>
          </div>
        </div>
        </>
        );

}

export default AveriasForm;