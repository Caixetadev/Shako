import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/auth/login'

const ws = new WebSocket('ws://localhost:9000/ws')

function App() {
  const [user, setUser] = useState({id: null});
  
  useEffect(() => {
      ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
      }

      ws.onclose = () => {
        console.log('disconnected')
      // automatically try to reconnect on connection loss
      }

      ws.onerror = err => {
        console.error(
            "Socket encountered error: ",
            "Closing socket"
        );

        ws.close();
    };
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
