import { useState, useEffect } from 'react'
import './App.css'
import {
  BrowserRouter,
  Route,
  Link
} from "react-router-dom"

import Login from './pages/auth/login'
import Register from './pages/auth/register'

interface User {
  id: string;
  username: string;
  token: string;
  email: string;
  discrimination: string;
  avatar: string;
  bg: string;
  admin: string;
}

function App() {
  const [user, setUser] = useState<User>({
    id: '',
    username: '',
    token: '',
    email: '',
    discrimination: '',
    avatar: '',
    bg: '',
    admin: '',
  });

  let intervalConnect = setInterval(function() {
    clearInterval(intervalConnect)
  }, 1000);

  const stringy = (json: object) => {
    return JSON.stringify(json)
  }

  const setLogged = (user: Object) => {
    setUser(user as any)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact render={(props) => <>
          { user?.id ? <>
            <h1>Logged with { user?.username}#{user?.discrimination}</h1>
          </> : <Login setLogged={setLogged} /> }
        </>} />
        <Route path="/login" exact render={(props) => <>
          { user?.id ? <>
            <h1>Logged with { user?.username}#{user?.discrimination}</h1>
          </> : <Login setLogged={setLogged} /> }
        </>} />
        <Route path="/app" exact render={(props) => <>
          { user?.id ? <>
            <h1>Logged with { user?.username}#{user?.discrimination}</h1>
          </> : <Login setLogged={setLogged} /> }
        </>} />
        <Route path="/register" exact render={(props) => <>
          { user?.id ? <>
            <h1>Logged with { user?.username}#{user?.discrimination}</h1>
          </> : <Register/> }
        </>} />
      </BrowserRouter>
    </div>
  )
}

export default App
