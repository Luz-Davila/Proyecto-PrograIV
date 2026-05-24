import './admin.css'
import { useEffect, useState, useMemo } from 'react'

function Admin() {

  const [users, setUsers] = useState([])

  const [search, setSearch] = useState('')

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      (user.name || '')
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [users, search])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState(false)

  const [visible, setVisible] =
    useState(10)

  useEffect(() => {

    fetch(
      'https://api.jsonbin.io/v3/b/6a0cfe5aee5a733b12e919a5',
      {

        headers: {

          'X-Master-Key':
            import.meta.env
              .VITE_JSON_MASTER_KEY,

          'Content-Type':
            'application/json'
        }
      }
    )

      .then((res) => {

        if (!res.ok) {

          throw new Error(
            'Error al cargar usuarios'
          )
        }

        return res.json()
      })

      .then((data) => {

        setUsers(data.record)

        setLoading(false)
      })

      .catch((error) => {

        console.log(error)

        setError(true)

        setLoading(false)
      })

  }, [])

  

  const getCedula = (user) => {
    return (
      user.cedula || user.ci || user.cedulaNumber || user.cedula_numero || user.cedulaNumero || user.idNumber || 'N/A'
    )
  }

  if (loading) {

    return (

      <div className="loading-container">

        <div className="spinner"></div>

        <p>
          Cargando usuarios...
        </p>

      </div>
    )
  }

  if (error) {

    return (

      <h1 className="error">
        Error al cargar usuarios
      </h1>
    )
  }

  return (

    <main className="admin">

      {/* HEADER */}
      <section className="admin-header">

        <h1>
          Gestión Administrativa
        </h1>

        <p>
          Administración de usuarios, busqueda, edición y más sobre los usuarios ingresados.
        </p>

      </section>

      {/* BUSCADOR */}
      <section className="search-container">

        <input
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </section>

      {/* GRID USUARIOS */}
      <section className="users-grid">

        {filteredUsers.length === 0 ? (

          <p>
            No se encontraron usuarios
          </p>

        ) : (

          filteredUsers
            .slice(0, visible)
            .map((user) => (

              <article
                className="user-card"
                key={user.id}
              >

                <div className="user-card-body">

                  <h2 className="user-name">{user.name}</h2>

                  <div className="user-field">
                    <label>Cédula</label>
                    <div className="user-value">{getCedula(user)}</div>
                  </div>

                  <div className="user-field">
                    <label>Correo</label>
                    <div className="user-value">{user.email || '—'}</div>
                  </div>

                  <div className="user-field">
                    <label>Rol</label>
                    <div className="user-value role">{user.role || '—'}</div>
                  </div>

                </div>

                <div className="user-card-actions">
                  <button className="edit-btn">Editar</button>
                </div>

              </article>

            ))
        )}

      </section>

      {/* BOTÓN VER MÁS */}
      {visible < filteredUsers.length && (

        <button
          className="more-btn"
          onClick={() =>
            setVisible(visible + 10)
          }
        >

          Ver más

        </button>

      )}

    </main>
  )
}

export default Admin
