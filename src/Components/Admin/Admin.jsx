import React, { useContext, useEffect } from "react"
import { UserContext } from "../../context/userContext"
import axios from "axios"
import { Outlet, useNavigate } from "react-router"
import AdminHeader from "../AdminHeader/AdminHeader"

export default function Admin() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user?.username) {
      navigate(-1)
    } else {
      axios
        .get(`http://localhost:4000/users/username/${user.username}`)
        .then((res) => {
          if (res?.data[0]?.role !== "admin") {
            navigate(-1)
          }
        })
        .catch((e) => {
          navigate(-1)
        })
    }
  }, [])
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  )
}
