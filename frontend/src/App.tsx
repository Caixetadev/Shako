import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/auth/login'

let ws = new WebSocket('ws://localhost:9000/ws')

function App() {
  const [user, setUser] = useState({id: null});
  let intervalConnect = setInterval(function() {
    clearInterval(intervalConnect)
  }, 1000);
  
  useEffect(() => {
      const connect = () => {
        ws = new WebSocket('ws://localhost:9000/ws')
        ws.onopen = () => {
          clearInterval(intervalConnect)
        }
  
        ws.onclose = () => {
          console.log('disconnected')
          clearInterval(intervalConnect)
          intervalConnect = setInterval(function() {
            connect();
          }, 1000);
        }
  
        ws.onerror = err => {
          console.error(
              "Socket encountered error: ",
              "Closing socket"
          );
          ws.close();
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
