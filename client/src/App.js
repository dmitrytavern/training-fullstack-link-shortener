import React from 'react'
import { AuthContext } from "./context/auth.context";
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { NavBar } from "./components/NavBar";
import 'materialize-css'
import { Loader } from "./components/Loader";

function App() {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
      <Router>
        { isAuthenticated && <NavBar /> }
        { routes }
      </Router>
    </AuthContext.Provider>
  )
}

export default App
