import { Outlet } from "react-router"
import Header from "./Components/Header/Header"

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App

