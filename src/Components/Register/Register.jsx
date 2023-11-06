import axios from "axios"
import React, { useContext, useState } from "react"
import { UserContext } from "../../context/userContext"
import { Link } from "react-router-dom"

export default function Login() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthDate, setBirthDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [buttonState, setButtonState] = useState(null)
  const { user, setUser } = useContext(UserContext)
  function onSubmit(e) {
    setButtonState("loading")
    e.preventDefault()
    axios
      .post("http://localhost:4000/users", {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: birthDate,
        role: "user",
        username: username,
        password: password,
      })
      .then((res) => {
        res.status === 201 ? setButtonState("success") : setButtonState("error")
      })
      .catch((e) => {
        setButtonState("error")
      })
      .finally(() => {
        setTimeout(() => {
          setButtonState(null)
        }, 1000)
      })
  }
  return (
    <section className="mt-5 w-50 mx-auto d-flex flex-column justify-content-start align-items-center">
      <form className="w-25 mx-auto">
        <div className="mb-3">
          <label htmlFor="firstNameInput" className="form-label">
            First name:
          </label>
          <input
            type="text"
            className="form-control"
            id="firstNameInput"
            value={firstName}
            onInput={(e) => {
              setFirstName(e.target.value)
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastNameInput" className="form-label">
            Last name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastNameInput"
            value={lastName}
            onInput={(e) => {
              setLastName(e.target.value)
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="birthDateInput" className="form-label">
            Date of birth:
          </label>
          <input
            type="date"
            className="form-control"
            id="birthDateInput"
            value={birthDate}
            onInput={(e) => {
              setBirthDate(
                e.target.value || new Date().toISOString().split("T")[0]
              )
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="usernameInput"
            value={username}
            onInput={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            value={password}
            onInput={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <button
          className="btn btn-primary w-100 mt-2"
          onClick={(e) => {
            onSubmit(e)
          }}
        >
          {buttonState === "loading"
            ? "Loading"
            : buttonState === "error"
            ? "Oops!"
            : buttonState === "success"
            ? "Success"
            : "Register"}
        </button>
      </form>
      <Link to="/login" className="link-opacity-100-hover mt-3">
        Login
      </Link>
    </section>
  )
}
