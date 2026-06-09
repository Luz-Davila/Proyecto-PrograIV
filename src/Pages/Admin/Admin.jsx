import './Admin.css'
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

  const [editingId, setEditingId] =
    useState(null)

  const [editedUser, setEditedUser] =
    useState({})

  useEffect(() => {

    fetch(
      'https://api.jsonbin.io/v3/b/6a0cfe5aee5a733b12e919a5',
      {

        headers: {

          'X-Master-Key':
            import.meta.env
              .VITE_JSONBIN_MASTER_KEY,

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
      user.cedula ||
      user.ci ||
      user.cedulaNumber ||
      user.cedula_numero ||
      user.cedulaNumero ||
      user.idNumber ||
      'N/A'
    )
  }

  const handleEdit = (user) => {

    setEditingId(user.email)

    setEditedUser({
      name: user.name || '',
      email: user.email || '',
      role: user.role || ''
    })
  }

  const handleSave = async (email) => {

    const updatedUsers = users.map((user) =>

      user.email === email
        ? { ...user, ...editedUser }
        : user
    )

    try {
      const response = await fetch(
        'https://api.jsonbin.io/v3/b/6a0cfe5aee5a733b12e919a5',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': import.meta.env.VITE_JSONBIN_MASTER_KEY,
          },
          body: JSON.stringify(updatedUsers),
        }
      )

      if (!response.ok) {
        throw new Error('Error al guardar usuarios en el JSON')
      }

      setUsers(updatedUsers)
      setEditingId(null)
    } catch (saveError) {
      console.error(saveError)
      alert('No se pudo guardar la edición. Intente de nuevo.')
    }
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
    key={user.email}
    >

    <div className="user-card-body">

    {editingId === user.email ? (

      <>

        <div className="user-field">
          <label>Nombre</label>

          <input
            type="text"
            value={editedUser.name}
            onChange={(e) =>
              setEditedUser({
                ...editedUser,
                name: e.target.value
              })
            }
          />
        </div>

        <div className="user-field">
          <label>Correo</label>

          <input
            type="text"
            value={editedUser.email}
            onChange={(e) =>
              setEditedUser({
                ...editedUser,
                email: e.target.value
              })
            }
          />
        </div>

        <div className="user-field">
          <label>Rol</label>

          <select
            value={editedUser.role}
            onChange={(e) =>
              setEditedUser({
                ...editedUser,
                role: e.target.value
              })
            }
          >

            <option value="Administrativo">
              Administrativo
            </option>

            <option value="Abonado">
              Abonado
            </option>

            <option value="Fontanero">
              Fontanero
            </option>

            <option value="Junta Directiva">
              Junta Directiva
            </option>

          </select>
              </div>

              </>

              ) : (

          <>

          <h2 className="user-name">
          {user.name}
          </h2>

          <div className="user-field">
          <label>Cédula</label>

          <div className="user-value">
          {getCedula(user)}
          </div>
          </div>

          <div className="user-field">
          <label>Correo</label>

          <div className="user-value">
          {user.email || '—'}
          </div>
          </div>

          <div className="user-field">
          <label>Rol</label>

          <div className="user-value role">
          {user.role || '—'}
          </div>
          </div>

          </>

          )}

    </div>

          <div className="user-card-actions">

            <button
              className="edit-btn"
              onClick={() =>

                editingId === user.email
                  ? handleSave(user.email)
                  : handleEdit(user)
              }
            >

              {editingId === user.email
                ? 'Guardar'
                : 'Editar'}

            </button>

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