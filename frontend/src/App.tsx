import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/auth/login'

let ws = () => {}

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
  var ws = new WebSocket('ws://localhost:9000/ws')

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
      {!user?.id ? <Login ws={ws} setLogged={setLogged}/> :
      <>
        {/* Logged */}
        <h1>Logged page</h1>
        <h1>Hello {user?.username} </h1>
      </>
      }
    </div>
  )
}

export default App
