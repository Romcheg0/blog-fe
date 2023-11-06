import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/userContext"

export default function AdminHeader() {
  const { user } = useContext(UserContext)
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-5">
                <Link
                  to="/admin/users"
                  className="nav-link active"
                  aria-current="page"
                >
                  Users
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  to="/admin/posts"
                  className="nav-link active"
                  aria-current="page"
                >
                  Posts
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  to="/login"
                  className="nav-link active"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
            </ul>
            {user?.username ? `Hello, @${user.username}!` : ""}
          </div>
        </div>
      </nav>
    </header>
  )
}
