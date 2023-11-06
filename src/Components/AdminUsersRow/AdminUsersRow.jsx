import axios from "axios"
import React, { useState } from "react"

export default function AdminUsersRow({
  user,
  setModalMode,
  setCurrentUser,
  fetchData,
}) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{new Date(user.date_of_birth).toLocaleDateString()}</td>
      <td>{user.role}</td>
      <td>{user.username}</td>
      <td>
        <button
          className="btn m-0 p-0"
          onClick={() => {
            navigator.clipboard.writeText(user.password)
          }}
        >
          <span className="text-decoration-underline">Copy</span>
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#userModal"
          onClick={() => {
            setModalMode("edit")
            setCurrentUser({
              id: user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              date_of_birth: new Date(user.date_of_birth)
                .toISOString()
                .split("T")[0],
              role: user.role,
              username: user.username,
              password: user.password,
            })
          }}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              axios
                .delete(`http://localhost:4000/users/${user.id}`)
                .then(() => {
                  fetchData()
                })
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}
