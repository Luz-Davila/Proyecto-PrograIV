import './Admin.css'
import { useEffect, useState } from 'react'
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import ReportesAverias from "../../Components/ReportesAverias/ReportesAverias";
import axios from 'axios'

const API_URL =
  'https://backend-proyecto.tryasp.net/api/Admin'

function Admin() {

  const [users, setUsers] = useState([])

  const [filteredUsers, setFilteredUsers] =
    useState([])

  const [search, setSearch] = useState('')

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

  axios.get(API_URL)

    .then((response) => {

      const data = response.data

      setUsers(data)

      setFilteredUsers(data)

      setLoading(false)
    })

    .catch((error) => {

      console.log(error)

      setError(true)

      setLoading(false)
    })

}, [])

  useEffect(() => {

    const filtered = users.filter((user) =>

      (user.name || '')
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    setFilteredUsers(filtered)

  }, [search, users])

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
      id: user.id,
      name: user.name || '',
      cedula: user.cedula || '',
      email: user.email || '',
      role: user.role || ''
    })
  }

  const handleSave = async () => {

  try {

    const response = await axios.put(
      `${API_URL}/${editedUser.id}`,
      editedUser
    )

    const updatedUser = response.data

    const updatedUsers = users.map(user =>
      user.id === updatedUser.id
        ? updatedUser
        : user
    )

    setUsers(updatedUsers)

    setEditingId(null)

  } catch (error) {

    console.log(error)

    alert('No se pudo guardar la edición')
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

    <DashboardLayout title="Gestión Administrativa">

      {/* HEADER */}
      <section className="admin-header">

        <h1>
          Gestión Administrativa
        </h1>

        <p>
          Administración de usuarios,
          búsqueda, edición y más sobre
          los usuarios ingresados.
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

      {/* GRID */}
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

                        <label>
                          Nombre
                        </label>

                        <input
                          type="text"
                          value={editedUser.name}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              name:
                                e.target.value
                            })
                          }
                        />

                      </div>

                      <div className="user-field">

                        <label>
                          Correo
                        </label>

                        <input
                          type="text"
                          value={editedUser.email}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              email:
                                e.target.value
                            })
                          }
                        />

                      </div>

                      <div className="user-field">

                        <label>
                          Rol
                        </label>

                        <select
                          value={editedUser.role}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              role:
                                e.target.value
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

                        <label>
                          Cédula
                        </label>

                        <div className="user-value">
                          {getCedula(user)}
                        </div>

                      </div>

                      <div className="user-field">

                        <label>
                          Correo
                        </label>

                        <div className="user-value">
                          {user.email || '—'}
                        </div>

                      </div>

                      <div className="user-field">

                        <label>
                          Rol
                        </label>

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
                      ? handleSave()
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

      {/* VER MÁS */}
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

      {/* SECCIÓN DE REPORTES DE AVERÍAS */}
      <section className="reportes-section">
        <ReportesAverias />
      </section>

    </DashboardLayout>
  )
}

export default Admin