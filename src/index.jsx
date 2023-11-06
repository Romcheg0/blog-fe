import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./Components/Main/Main"
import Admin from "./Components/Admin/Admin"
import Login from "./Components/Login/Login"
import SinglePost from "./Components/SinglePost/SinglePost"
import SingleAuthor from "./Components/SingleAuthor/SingleAuthor"
import { UserContextProvider } from "./context/userContext"
import Register from "./Components/Register/Register"
import AdminUsers from "./Components/AdminUsers/AdminUsers"
import AdminPosts from "./Components/AdminPosts/AdminPosts"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path="home" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="post/:id" element={<SinglePost />} />
            <Route path="author/:id" element={<SingleAuthor />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminUsers />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="posts" element={<AdminPosts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
)

