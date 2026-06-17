import { useEffect, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
function Inventario() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [mostrarInactivos, setMostrarInactivos] = useState(false);
  const url = import.meta.env.VITE_JSONBIN_URL;
const key = import.meta.env.VITE_JSONBIN_KEY;

console.log(url, key);

  //  Cargar datos
  useEffect(() => {
  fetch(import.meta.env.VITE_JSONBIN_URL, {
    headers: {
      "X-Master-Key": import.meta.env.VITE_JSONBIN_KEY,
      "X-Bin-Meta": "false"
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log("DATA:", res);

      const inventario = res?.inventario || [];
      setData(inventario);
    })
    .catch(err => console.log(err));

}, []);

  //  AGREGAR
  const agregarProducto = () => {
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

    const nuevo = {
      id: Date.now(),
      nombre,
      categoria: "Herramientas",
      cantidad: parseInt(cantidad),
      estado: "Bueno",
      imagen: imagen || "https://via.placeholder.com/150",
      activo: true
    };

    setData([...data, nuevo]);
  };

  //  INHABILITAR
  const inhabilitarProducto = (id) => {
    const confirmar = confirm("¿Inhabilitar este producto?");
    if (!confirmar) return;

    setData(
      data.map(item =>
        item.id === id ? { ...item, activo: false } : item
      )
    );
  };

  //  REACTIVAR
  const reactivarProducto = (id) => {
    setData(
      data.map(item =>
        item.id === id ? { ...item, activo: true } : item
      )
    );
  };

  //  SUMAR
  const sumarCantidad = (id) => {
    setData(
      data.map(item =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  //  RESTAR
  const restarCantidad = (id) => {
    setData(
      data.map(item =>
        item.id === id && item.cantidad > 0
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  //  EDITAR NOMBRE
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
    <DashboardLayout title="Inventario ASADA">
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1 style={{ textAlign: "center" }}>Inventario ASADA</h1>

      {/*  Agregar */}
      <button onClick={agregarProducto}>➕ Agregar producto</button>

      {/*  Mostrar/Ocultar */}
      <button
        onClick={() => setMostrarInactivos(!mostrarInactivos)}
        style={{ marginLeft: "10px" }}
      >
        {mostrarInactivos ? "Ocultar inhabilitados" : "Ver inhabilitados"}
      </button>

      {/*  Buscador */}
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />

      {/*  Filtro */}
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

      {/*  Tarjetas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
        {data
          .filter(item => {
            const coincideBusqueda = item.nombre
              .toLowerCase()
              .includes(search.toLowerCase());

            const coincideCategoria =
              categoria === "Todos" || item.categoria === categoria;

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
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                }
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />

              <h3>{item.nombre}</h3>
              <p>Cantidad: {item.cantidad}</p>

              <button onClick={() => restarCantidad(item.id)}>➖</button>
              <button onClick={() => sumarCantidad(item.id)}>➕</button>

              <br /><br />

              <button onClick={() => editarNombre(item.id)}>
                ✏️ Nombre
              </button>

              {item.activo !== false ? (
                <button
                  onClick={() => inhabilitarProducto(item.id)}
                  style={{ marginLeft: "5px" }}
                >
                  🚫
                </button>
              ) : (
                <button
                  onClick={() => reactivarProducto(item.id)}
                  style={{ marginLeft: "5px" }}
                >
                  ♻️
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  </DashboardLayout> 
  );
}

export default Inventario;