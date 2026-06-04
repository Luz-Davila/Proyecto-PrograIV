import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useForm } from "@tanstack/react-form";
import { useAbonados } from "../../Hooks/useAbonados";
import "./Abonados.css";

export default function Abonados() {
  const {
    data: abonados,
    setData: setAbonados,
    loading,
    error,
    save: saveAbonados,
    reload,
  } = useAbonados();
  const [editando, setEditando] = useState(null); 
  const [globalFilter, setGlobalFilter] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    void reload();
  }, [reload]);

  // ── TanStack Form ─────────────────────────────────────────────────────────
  const form = useForm({
    defaultValues: {
      nombreCompleto: "",
      cedula: "",
      numeroMedidor: "",
      direccion: "",
      telefono: "",
      estado: "Activo",
    },
    onSubmit: async ({ value }) => {
      setGuardando(true);
      try {
        let nuevaLista;

        if (editando !== null) {
          // Actualizar
          nuevaLista = abonados.map((a) =>
            a.id === editando ? { ...a, ...value } : a
          );
        } else {
          // Crear
          const nuevoId =
            abonados.length > 0
              ? Math.max(...abonados.map((a) => a.id)) + 1
              : 1;
          nuevaLista = [...abonados, { id: nuevoId, ...value }];
        }

        await saveAbonados(nuevaLista);
        setAbonados(nuevaLista);
        setEditando(null);
        form.reset();
      } catch (error) {
        console.error(error);
      } finally {
        setGuardando(false);
      }
    },
  });

  // Cargar datos del abonado al editar
  function iniciarEdicion(abonado) {
    setEditando(abonado.id);
    form.setFieldValue("nombreCompleto", abonado.nombreCompleto);
    form.setFieldValue("cedula", abonado.cedula);
    form.setFieldValue("numeroMedidor", abonado.numeroMedidor);
    form.setFieldValue("direccion", abonado.direccion);
    form.setFieldValue("telefono", abonado.telefono);
    form.setFieldValue("estado", abonado.estado);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditando(null);
    form.reset();
  }

  // ── Columnas TanStack Table ───────────────────────────────────────────────
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      size: 60,
    },
    {
      accessorKey: "nombreCompleto",
      header: "Nombre Completo",
    },
    {
      accessorKey: "cedula",
      header: "Cédula",
    },
    {
      accessorKey: "numeroMedidor",
      header: "N° Medidor",
    },
    {
      accessorKey: "direccion",
      header: "Dirección",
    },
    {
      accessorKey: "telefono",
      header: "Teléfono",
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ getValue }) => {
        const val = getValue();
        return (
          <span className={`badge ${val === "Activo" ? "badge-activo" : "badge-inactivo"}`}>
            {val}
          </span>
        );
      },
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <button
          className="btn-editar"
          onClick={() => iniciarEdicion(row.original)}
        >
          Editar
        </button>
      ),
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: abonados,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="abonados-wrapper">
      {/* Header */}
      <div className="abonados-header">
        <h1>Módulo de Abonados</h1>
      </div>

      {/* Formulario */}
      <div className="form-card">
        <h2 className="form-title">
          {editando !== null ? "Editar Abonado" : "Nuevo Abonado"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="form-grid">
            {/* Nombre */}
            <form.Field name="nombreCompleto">
              {(field) => (
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>
              )}
            </form.Field>

            {/* Cédula */}
            <form.Field name="cedula">
              {(field) => (
                <div className="form-group">
                  <label>Cédula</label>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Ej: 502340567"
                    required
                  />
                </div>
              )}
            </form.Field>

            {/* N° Medidor */}
            <form.Field name="numeroMedidor">
              {(field) => (
                <div className="form-group">
                  <label>N° Medidor</label>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Ej: MED-1001"
                    required
                  />
                </div>
              )}
            </form.Field>

            {/* Teléfono */}
            <form.Field name="telefono">
              {(field) => (
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Ej: 8888-1111"
                    required
                  />
                </div>
              )}
            </form.Field>

            {/* Dirección */}
            <form.Field name="direccion">
              {(field) => (
                <div className="form-group form-group--wide">
                  <label>Dirección</label>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Ej: Santa Cruz Centro, Guanacaste"
                    required
                  />
                </div>
              )}
            </form.Field>

            {/* Estado */}
            <form.Field name="estado">
              {(field) => (
                <div className="form-group">
                  <label>Estado</label>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              )}
            </form.Field>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button type="submit" className="btn-guardar" disabled={guardando}>
              {guardando ? "Guardando..." : editando !== null ? "Actualizar" : "Guardar"}
            </button>
            {editando !== null && (
              <button
                type="button"
                className="btn-cancelar"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {error && <p className="error-msg">{error}</p>}
      </div>

      {/* Controles tabla */}
      <div className="table-controls">
        <div className="page-size-control">
          <label>Mostrar</label>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <label>registros</label>
        </div>

        <div className="search-control">
          <label>Buscar:</label>
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar abonado..."
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="table-container">
        {loading ? (
          <p className="loading-msg">Cargando abonados...</p>
        ) : (
          <table className="abonados-table">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={header.column.getCanSort() ? "sortable" : ""}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" && " ▲"}
                      {header.column.getIsSorted() === "desc" && " ▼"}
                      {header.column.getCanSort() && !header.column.getIsSorted() && " ⇅"}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="no-data">
                    No se encontraron abonados.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginación */}
      {!loading && (
        <div className="pagination">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ← Anterior
          </button>
          <span>
            Página{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}