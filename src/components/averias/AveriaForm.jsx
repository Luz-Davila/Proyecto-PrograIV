import { useState } from "react";
import "./AveriaForm.css";
import { agregarAveria } from "../../services/averiasService";

import {
  User,
  MapPin,
  FileText,
  Send,
  AlertTriangle
} from "lucide-react";

function FormularioAveria({ onAveriaAgregada }) {

  // ESTADOS
  const [nombre, setNombre] = useState("");
  const [tipoAveria, setTipoAveria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [fecha, setFecha] = useState("");
  const [errores, setErrores] = useState({});

  // VALIDAR FORMULARIO
  const validarFormulario = () => {

    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido";
    }

    if (!tipoAveria) {
      nuevosErrores.tipoAveria = "Seleccione un tipo de avería";
    }

    if (!descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es requerida";
    }

    if (!ubicacion.trim()) {
      nuevosErrores.ubicacion = "La ubicación es requerida";
    }

    if (!estado) {
      nuevosErrores.estado = "Seleccione un estado";
    }

    if (!prioridad) {
      nuevosErrores.prioridad = "Seleccione medio";
    }

    if (!fecha) {
      nuevosErrores.fecha = "Seleccione la fecha";
    }

    return nuevosErrores;
  };

  // ENVIAR FORMULARIO
  const manejarEnvio = async (e) => {

    e.preventDefault();

    const nuevosErrores = validarFormulario();

    if (Object.keys(nuevosErrores).length === 0) {

      alert("Reporte enviado exitosamente");

      console.log({
        nombre,
        tipoAveria,
        descripcion,
        ubicacion,
        estado,
        prioridad,
        fecha
      });

      const resultado = await agregarAveria({
        nombre,
        tipoAveria,
        descripcion,
        ubicacion,
        estado,
        prioridad,
        fecha
      });

      if (Array.isArray(resultado)) {
        onAveriaAgregada?.(resultado);
      }

      // LIMPIAR FORMULARIO
      setNombre("");
      setTipoAveria("");
      setDescripcion("");
      setUbicacion("");
      setEstado("");
      setPrioridad("");
      setFecha("");
      setErrores({});

    } else {
      setErrores(nuevosErrores);
    }
  };

  return (

    <div className="card-formulario">

      <h2 className="titulo-formulario">
        <AlertTriangle size={30} />
        Reporte de Averías
      </h2>

      <form onSubmit={manejarEnvio}>

        {/* NOMBRE */}

        <div className="grupo-input">

          <label>
            <User size={18} />
            Nombre
          </label>

          <input
            type="text"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          {errores.nombre && (
            <p className="error">{errores.nombre}</p>
          )}

        </div>

        {/* TIPO AVERIA */}

        <div className="grupo-input">

          <label>
            <AlertTriangle size={18} />
            Tipo de Avería
          </label>

          <select
            value={tipoAveria}
            onChange={(e) => setTipoAveria(e.target.value)}
          >

            <option value="">
              Seleccione una opción
            </option>

            <option value="Fuga de agua">
              Fuga de agua
            </option>

            <option value="Tubería rota">
              Tubería rota
            </option>

            <option value="Sin agua">
              Sin agua
            </option>

            <option value="Medidor dañado">
              Medidor dañado
            </option>

          </select>

          {errores.tipoAveria && (
            <p className="error">{errores.tipoAveria}</p>
          )}

        </div>

        {/* DESCRIPCION */}

        <div className="grupo-input">

          <label>
            <FileText size={18} />
            Descripción
          </label>

          <textarea
            placeholder="Describa la avería"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          {errores.descripcion && (
            <p className="error">{errores.descripcion}</p>
          )}

        </div>

        {/* UBICACION */}

        <div className="grupo-input">

          <label>
            <MapPin size={18} />
            Ubicación
          </label>

          <input
            type="text"
            placeholder="Ingrese la ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />

          {errores.ubicacion && (
            <p className="error">{errores.ubicacion}</p>
          )}

        </div>

        {/* ESTADO */}

        <div className="grupo-input">

          <label>
            Estado
          </label>

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En proceso</option>
            <option value="Resuelto">Resuelto</option>
          </select>

          {errores.estado && (
            <p className="error">{errores.estado}</p>
          )}

        </div>

        {/* PRIORIDAD */}

        <div className="grupo-input">

          <label>
            Prioridad
          </label>

          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="">Seleccione medio</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>

          {errores.prioridad && (
            <p className="error">{errores.prioridad}</p>
          )}

        </div>

        {/* FECHA */}

        <div className="grupo-input">

          <label>
            Fecha
          </label>

          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          {errores.fecha && (
            <p className="error">{errores.fecha}</p>
          )}

        </div>

        {/* BOTON */}

        <button
          type="submit"
          className="btn-enviar"
        >

          <Send size={18} />

          Enviar Reporte

        </button>

      </form>

    </div>
  );
}

export default FormularioAveria;