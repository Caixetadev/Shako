import { useState, useEffect } from 'react'


function Login(props: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(true);
    
    useEffect(() => {
        props.ws.onmessage = (evt: any) => {
        // listen to data sent from the websocket server
          const message = JSON.parse(evt.data)
          if(message.type === "login"){
            setError(message.sucess)
            if(message.user?.id){
              window.localStorage.setItem('token', message.user.token)
              props.setLogged(message.user)
            }
          }
        }
  
        props.ws.onclose = () => {
          //Close ws
        }
  
        props.ws.onerror = (err: any) => {
          // console.error(
          //     "Socket encountered error: ",
          //     "Closing socket"
          // );
  
          props.ws.close();
      };
    }, []);
  
    const stringy = (json: object) => {
      return JSON.stringify(json)
    }
  
    return (
      <div className="App">
        <div className="login-container">
          <div className={`login-box ${(error ? '': 'error')}`}>
            <form
            onSubmit={(e: any) => {
              e.preventDefault();
              const data = {type: 'userLogin', data: {email, password}};
              props.ws.send(stringy(data))
            }}
            >
              <div className="login-box-content">
                <h1 className="title">Welcome back!</h1>
                <h4 className="subtitle">We're so excited to see you again!</h4>
                <label htmlFor="email">Email</label>
                <input 
                onKeyUp={(e) => setEmail((e.target as any).value)}
                type="text" id="email" autoComplete="off"/>
                <label htmlFor="password">Password</label>
                <input 
                onKeyUp={(e) => setPassword((e.target as any).value)}
                type="password" id="password"/>
                <span className='error'>{ !error && "E-mail or password incorrects" }</span>
                <p><a className="register" href="#">Forgot your password?</a></p>
                <button>Login</button>
                <p>Need an account? <a className="register" href="#">Register</a></p>
              </div>
            </form>
          </div>
      </div>
      </div>
    )
}

export default Login