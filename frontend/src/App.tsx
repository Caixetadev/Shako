import { useState, useEffect } from 'react'
import './App.css'

const ws = new WebSocket('ws://localhost:9000/ws')

function App() {

  
  useEffect(() => {
      ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
      }

      ws.onmessage = evt => {
      // listen to data sent from the websocket server
        const message = JSON.parse(evt.data)
        console.log(message)
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

  const stringy = json => {
    return JSON.stringify(json)
  }

  return (
    <div className="App">
      <button onClick={() => ws.send(stringy({"type": "userRegister", "data": {"email": "xande1231221@hotmail.com", "password": "xande123", "username": 'kaway404'}}))}>
        Clicar
      </button>
    </div>
  )
}

export default App
