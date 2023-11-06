import axios from "axios"
import React, { useEffect, useState } from "react"
import AdminUsersRow from "../AdminUsersRow/AdminUsersRow"

const Modal = ({
  currentUser,
  setCurrentUser,
  sendFormData,
  modalMode,
  buttonMode,
}) => {
  return (
    <div
      className="modal fade"
      id="userModal"
      tabIndex="-1"
      aria-labelledby="userModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5" id="userModalTitle">
              {modalMode === "create" ? "Add" : "Edit"} a user
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={() => {
                return false
              }}
            >
              <div className="mb-3">
                <label htmlFor="firstNameInput" className="form-label">
                  First name:{" "}
                </label>
                <input
                  type="text"
                  value={currentUser.firstName}
                  required
                  onChange={(e) => {
                    setCurrentUser({
                      ...currentUser,
                      firstName: e.target.value,
                    })
                  }}
                  className="form-control"
                  id="firstNameInput"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastNameInput" className="form-label">
                  Last name:{" "}
                </label>
                <input
                  type="text"
                  value={currentUser.lastName}
                  required
                  onChange={(e) => {
                    setCurrentUser({
                      ...currentUser,
                      lastName: e.target.value,
                    })
                  }}
                  className="form-control"
                  id="lastNameInput"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthDateInput" className="form-label">
                  Date of birth :{" "}
                </label>
                <input
                  type="date"
                  value={currentUser.date_of_birth}
                  required
                  onChange={(e) => {
                    setCurrentUser({
                      ...currentUser,
                      date_of_birth: e.target.value,
                    })
                  }}
                  className="form-control"
                  id="birthDateInput"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roleSelect" className="form-label">
                  Role:{" "}
                </label>
                <select
                  id="roleSelect"
                  className="form-select"
                  aria-label="Select the user's role"
                  required
                  value={currentUser.role}
                  onChange={(e) => {
                    setCurrentUser({ ...currentUser, role: e.target.value })
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">
                  Username:{" "}
                </label>
                <input
                  type="text"
                  value={currentUser.username}
                  required
                  onChange={(e) => {
                    setCurrentUser({
                      ...currentUser,
                      username: e.target.value,
                    })
                  }}
                  className="form-control"
                  id="usernameInput"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">
                  Password:{" "}
                </label>
                <input
                  type="password"
                  value={currentUser.password}
                  required
                  onChange={(e) => {
                    setCurrentUser({
                      ...currentUser,
                      password: e.target.value,
                    })
                  }}
                  className="form-control"
                  id="passwordInput"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                sendFormData(e)
              }}
            >
              {buttonMode === "loading"
                ? "Loading"
                : buttonMode === "error"
                ? "Oops!"
                : buttonMode === "success"
                ? "Success"
                : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminUsers() {
  const [users, setUsers] = useState({ data: [], loading: true, error: null })
  const [modalMode, setModalMode] = useState("create")
  const [buttonMode, setButtonMode] = useState(null)
  const [currentUser, setCurrentUser] = useState({
    id: null,
    firstName: "",
    lastName: "",
    date_of_birth: new Date().toISOString().split("T")[0],
    role: "user",
    username: "",
    password: "",
  })
  function sendFormData(e) {
    e.preventDefault()
    setButtonMode("loading")
    if (
      currentUser.firstName.length < 4 ||
      currentUser.lastName.length < 4 ||
      !currentUser.date_of_birth ||
      currentUser.username.length < 4 ||
      currentUser.password.length < 10
    ) {
      setButtonMode("error")
      alert("Incorrect data!")
      setTimeout(() => {
        setButtonMode(null)
      }, 1000)
      return
    }
    if (modalMode === "create") {
      axios
        .post("http://localhost:4000/users", {
          id: currentUser.id,
          first_name: currentUser.firstName,
          last_name: currentUser.lastName,
          date_of_birth: currentUser.date_of_birth,
          role: currentUser.role,
          username: currentUser.username,
          password: currentUser.password,
        })
        .then((res) => {
          if (res.status === 201) {
            setButtonMode("success")
          } else {
            setButtonMode("error")
          }
        })
        .catch((e) => {
          setButtonMode("error")
        })
        .finally(() => {
          setTimeout(() => {
            setButtonMode("null")
          }, 1000)
        })
    } else {
      axios
        .put(`http://localhost:4000/users/${currentUser.id}`, {
          first_name: currentUser.firstName,
          last_name: currentUser.lastName,
          date_of_birth: currentUser.date_of_birth,
          role: currentUser.role,
          username: currentUser.username,
          password: currentUser.password,
        })
        .then((res) => {
          if (res.status === 201) {
            setButtonMode("success")
          } else {
            setButtonMode("error")
          }
        })
        .catch((e) => {
          setButtonMode("error")
        })
        .finally(() => {
          setTimeout(() => {
            setButtonMode("null")
            fetchData()
          }, 1000)
        })
    }
  }
  function fetchData() {
    axios
      .get(`http://localhost:4000/users`)
      .then((res) => {
        setUsers({ data: res.data, loading: false, error: null })
      })
      .catch((e) => {
        setUsers({ data: [], loading: false, error: e.message })
      })
  }

  useEffect(() => {
    fetchData()
    const reloadInterval = setInterval(() => {
      fetchData()
    }, 5000)
    return () => {
      clearInterval(reloadInterval)
    }
  }, [])
  return users.loading ? (
    <h2>Loading...</h2>
  ) : users.error ? (
    <h2>Error! {users.error}</h2>
  ) : (
    <section className="w-50 size-lg mx-auto mt-3 d-flex flex-column align-items-center">
      <Modal
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        sendFormData={sendFormData}
        modalMode={modalMode}
        buttonMode={buttonMode}
      />
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#userModal"
        onClick={() => {
          setModalMode("create")
        }}
      >
        Add user
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Date of birth</th>
            <th>Role</th>
            <th>Username</th>
            <th>Password</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((item) => (
            <AdminUsersRow
              key={item.id}
              user={item}
              setModalMode={setModalMode}
              setCurrentUser={setCurrentUser}
              fetchData={fetchData}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}
