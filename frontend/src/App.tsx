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

  const stringy = (json: object) => {
    return JSON.stringify(json)
  }

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-box">
          <div className="login-box-content">
            <h1 className="title">Welcome back!</h1>
            <h4 className="subtitle">We're so excited to see you again!</h4>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" autoComplete="off"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password"/>
            <p><a className="register" href="#">Forgot your password?</a></p>
            <button>Login</button>
            <p>Need an account? <a className="register" href="#">Register</a></p>
          </div>
        </div>
    </div>
    </div>
  )
}

export default App
