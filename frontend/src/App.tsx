import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/auth/login'

let ws = () => {}

function App() {
  const [user, setUser] = useState({id: null});
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
          clearInterval(intervalConnect)
          intervalConnect = setInterval(function() {
            ws = new WebSocket('ws://localhost:9000/ws')
          }, 1000);
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
      </>
      }
    </div>
  )
}

export default App
