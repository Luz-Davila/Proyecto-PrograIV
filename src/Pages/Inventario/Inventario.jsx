import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";

const API_URL = "https://backend-proyecto.tryasp.net/api/Inventario";

function Inventario() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [mostrarInactivos, setMostrarInactivos] = useState(false);

  // Función para obtener los headers con el JWT en cada petición
  const getHeaders = useCallback(() => {
    const token = localStorage.getItem("token"); 
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  }, []);

  // Función central para cargar la base de datos
  const cargarInventario = useCallback(() => {
    fetch(API_URL, { headers: getHeaders() })
      .then(res => {
        if (!res.ok) throw new Error("No autorizado o error en el servidor");
        return res.json();
      })
      .then(res => setData(res))
      .catch(err => console.error("Error cargando inventario:", err));
  }, [getHeaders]);

  // Cargar datos al iniciar el componente
  useEffect(() => {
    cargarInventario();
  }, [cargarInventario]);

  // AGREGAR MANUAL (Hace POST a .NET)
  const agregarProducto = async () => {
    const nombre = prompt("Nombre del producto:");
    const cantidad = prompt("Cantidad:");
    const imagen = prompt("URL de la imagen:");

    if (!nombre || !cantidad) {
      alert("Debes completar nombre y cantidad");
      return;
    }

    if (isNaN(cantidad)) {
      alert("La cantidad debe ser un número");
      return;
    }

    const existe = data.some(
      item => item.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (existe) {
      alert("Ya existe un producto con ese nombre");
      return;
    }

    const nuevoForm = {
      nombre,
      categoria: "Herramientas",
      cantidad: parseInt(cantidad),
      estado: "Bueno",
      uso: "General",
      imagen: imagen || "https://via.placeholder.com/150"
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(nuevoForm)
      });

      if (res.ok) {
        cargarInventario(); 
      } else {
        alert("Error al guardar en el servidor");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // INHABILITAR (Hace PUT a .NET)
  const inhabilitarProducto = async (id) => {
    const confirmar = confirm("¿Inhabilitar este producto?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}/estado`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(false) 
      });
      if (res.ok) cargarInventario();
    } catch (error) {
      console.error(error);
    }
  };

  // REACTIVAR (Hace PUT a .NET)
  const reactivarProducto = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/estado`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(true) 
      });
      if (res.ok) cargarInventario();
    } catch (error) {
      console.error(error);
    }
  };

  // SUMAR (Hace PUT a .NET)
  const sumarCantidad = async (id) => {
    const item = data.find(i => i.id === id);
    if (!item) return;

    try {
      const res = await fetch(`${API_URL}/${id}/cantidad`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(item.cantidad + 1)
      });
      if (res.ok) cargarInventario();
    } catch (error) {
      console.error(error);
    }
  };

  // RESTAR (Hace PUT a .NET)
  const restarCantidad = async (id) => {
    const item = data.find(i => i.id === id);
    if (!item || item.cantidad <= 0) return;

    try {
      const res = await fetch(`${API_URL}/${id}/cantidad`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(item.cantidad - 1)
      });
      if (res.ok) cargarInventario();
    } catch (error) {
      console.error(error);
    }
  };

  // EDITAR NOMBRE (Se mantiene local temporalmente)
  const editarNombre = (id) => {
    const nuevoNombre = prompt("Nuevo nombre:");
    if (!nuevoNombre) return;

    const existe = data.some(
      item =>
        item.nombre.toLowerCase() === nuevoNombre.toLowerCase() &&
        item.id !== id
    );

    if (existe) {
      alert("Ya existe un producto con ese nombre");
      return;
    }

    setData(
      data.map(item =>
        item.id === id ? { ...item, nombre: nuevoNombre } : item
      )
    );
  };

  return (
    // 2. ENVOLVEMOS TODO EN EL COMPONENTE DASHBOARDLAYOUT
    <DashboardLayout title="Inventario ASADA">
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1 style={{ textAlign: "center" }}>Inventario ASADA</h1>

        {/* Controles Principales */}
        <div style={{ marginBottom: "15px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <button onClick={agregarProducto}>➕ Agregar producto</button>

          <button onClick={() => setMostrarInactivos(!mostrarInactivos)}>
            {mostrarInactivos ? "Ocultar inhabilitados" : "Ver inhabilitados"}
          </button>
        </div>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ margin: "10px 0", padding: "10px", width: "100%", boxSizing: "border-box" }}
        />

        {/* Filtro por Categoría */}
        <select
          onChange={(e) => setCategoria(e.target.value)}
          style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
        >
          <option>Todos</option>
          <option>Herramientas</option>
          <option>Materiales</option>
          <option>Equipos</option>
          <option>Seguridad</option>
        </select>

        {/* Cuadrícula de Tarjetas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          {data
            .filter(item => {
              const coincideBusqueda = item.nombre?.toLowerCase().includes(search.toLowerCase());
              const coincideCategoria = categoria === "Todos" || item.categoria === categoria;

              if (mostrarInactivos) {
                return item.activo === false && coincideBusqueda && coincideCategoria;
              } else {
                return item.activo !== false && coincideBusqueda && coincideCategoria;
              }
            })
            .map(item => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "10px",
                  opacity: item.activo === false ? 0.4 : 1
                }}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />

                <h3>{item.nombre}</h3>
                <p>Cantidad: {item.cantidad}</p>

                <button onClick={() => restarCantidad(item.id)}>➖</button>
                <button onClick={() => sumarCantidad(item.id)}>➕</button>

                <br /><br />

                <button onClick={() => editarNombre(item.id)}>✏️ Nombre</button>

                {item.activo !== false ? (
                  <button onClick={() => inhabilitarProducto(item.id)} style={{ marginLeft: "5px" }}>🚫</button>
                ) : (
                  <button onClick={() => reactivarProducto(item.id)} style={{ marginLeft: "5px" }}>♻️</button>
                )}
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Inventario;