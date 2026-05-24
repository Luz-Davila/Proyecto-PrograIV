import "./AveriaTable.css";

import {
  AlertTriangle,
  MapPin,
  User,
  Calendar,
  FileText,
  Badge
} from "lucide-react";

function AveriaTable({ averias = [] }) {

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "badge-pendiente";
      case "En proceso":
        return "badge-proceso";
      case "Resuelto":
        return "badge-resuelto";
      default:
        return "badge-pendiente";
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "Baja":
        return "prioridad-baja";
      case "Media":
        return "prioridad-media";
      case "Alta":
        return "prioridad-alta";
      default:
        return "prioridad-baja";
    }
  };

  const formatearFecha = (fecha) => {
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    } catch {
      return fecha;
    }
  };

  return (
    <div className="tabla-container">
      <div className="tabla-header">
        <h2 className="titulo-tabla">
          <AlertTriangle size={28} />
          Lista de Averías
        </h2>
        <p className="cantidad-averias">
          Total: {averias.length} {averias.length === 1 ? "avería" : "averías"}
        </p>
      </div>

      {averias.length === 0 ? (
        <div className="sin-datos">
          <AlertTriangle size={48} />
          <p>No hay averías registradas</p>
        </div>
      ) : (
        <div className="grid-averias">
          {averias.map((averia) => (
            <div key={averia.id} className="tarjeta-averia">
              <div className="tarjeta-header">
                <div className="id-averia">#{averia.id}</div>
                <span className={`badge-estado ${getEstadoColor(averia.estado)}`}>
                  {averia.estado}
                </span>
              </div>

              <div className="tarjeta-body">
                <div className="averia-fila">
                  <div className="averia-icono">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="averia-label">Reportante</p>
                    <p className="averia-valor">{averia.nombre}</p>
                  </div>
                </div>

                <div className="averia-fila">
                  <div className="averia-icono">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <p className="averia-label">Tipo de Avería</p>
                    <p className="averia-valor">{averia.tipoAveria}</p>
                  </div>
                </div>

                <div className="averia-fila">
                  <div className="averia-icono">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="averia-label">Ubicación</p>
                    <p className="averia-valor">{averia.ubicacion}</p>
                  </div>
                </div>

                {averia.descripcion && (
                  <div className="averia-fila">
                    <div className="averia-icono">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="averia-label">Descripción</p>
                      <p className="averia-valor descripcion-texto">
                        {averia.descripcion}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="tarjeta-footer">
                <div className="prioridad-container">
                  <Badge size={16} />
                  <span className={`prioridad-badge ${getPrioridadColor(averia.prioridad)}`}>
                    {averia.prioridad}
                  </span>
                </div>

                <div className="fecha-container">
                  <Calendar size={16} />
                  <span>{formatearFecha(averia.fecha)}</span>
                </div>
              </div>

              {averia.imagen && (
                <div className="tarjeta-imagen">
                  <img
                    src={averia.imagen}
                    alt="Imagen de la avería"
                    className="imagen-averia"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AveriaTable;
