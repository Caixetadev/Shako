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

const ws = new WebSocket('ws://localhost:9000/ws')

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
  
  useEffect(() => {
      const connect = () => {
        ws.onopen = () => {
          clearInterval(intervalConnect)
          const data = {type: 'validationToken', data: {token: window.localStorage.getItem('token')?window.localStorage.getItem('token'): 'undefined'}};
          ws.send(stringy(data))
        }
  
        ws.onclose = () => {
          //Close ws
        }
  
        ws.onerror = err => {
          console.error(
              "Socket encountered error: ",
              "Closing socket"
          );
      };
      }
      connect()
  }, []);

  const setLogged = (user: Object) => {
    setUser(user as any)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact render={(props) => <>
          { user?.id ? <>
            <h1>Logged with { user?.username}#{user?.discrimination}</h1>
          </> : <Login ws={ws} setLogged={setLogged} Link /> }
        </>} />
        <Route path="/login" exact render={(props) => <>
          { user?.id ? <>
            <h1>Logged with { user?.username}#{user?.discrimination}</h1>
          </> : <Login ws={ws} setLogged={setLogged} Link /> }
        </>} />
        <Route path="/register" exact render={(props) => <>
          { user?.id ? <>
            <h1>Logged with { user?.username}#{user?.discrimination}</h1>
          </> : <Register ws={ws} Link/> }
        </>} />
      </BrowserRouter>
    </div>
  )
}

export default App
