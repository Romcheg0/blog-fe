import axios from "axios"
import React, { useContext, useState } from "react"
import { UserContext } from "../../context/userContext"
import { Link } from "react-router-dom"

export default function Login() {
  const { user, setUser } = useContext(UserContext)
  const [username, setUsername] = useState(user?.username || "")
  const [password, setPassword] = useState("")
  const [buttonState, setButtonState] = useState()
  function onSubmit(e) {
    e.preventDefault()
    setButtonState("loading")
    axios
      .post("http://localhost:4000/users/authenticate/auth", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.authenticated) {
          setButtonState("success")
          setUser({ username, password })
        } else {
          setUser()
          setButtonState("error")
        }
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
            : "Login"}
        </button>
      </form>
      <Link to="/register" className="link-opacity-100-hover mt-3">
        Register
      </Link>
    </section>
  )
}
