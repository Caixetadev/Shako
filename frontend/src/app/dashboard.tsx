import { useState, useEffect } from 'react'

import {
  Link
} from "react-router-dom";

const typePage = 'dashboard';

declare global {
  interface Window { MyNamespace: any; }
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

import { io, Socket } from "socket.io-client";
const ws = new WebSocket('ws://localhost:9000/ws/app')

function Dashboard({user}: any) {
    const [loading, setLoading] = useState(false);
    let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
       
    useEffect(() => {
        setTimeout(() => {
          const data = {type: 'app', data: {}};
          ws.send(stringy(data))
        }, 1000)


        ws.onmessage = (evt: any) => {
          // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            if(message.type === typePage){
              if(message.sucess){
                socket = io('localhost:9000');
                setLoading(true);
                const token = (window as any).localStorage.getItem('token')
              }
            }
          }
          
    }, [user]);
  
    const stringy = (json: object) => {
      return JSON.stringify(json)
    }
  
    return (
      <div className="App">
        <h1>Logged with { user?.username}#{user?.discrimination}</h1>
      </div>
    )
}

export default Dashboard