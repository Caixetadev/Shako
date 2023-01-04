import { useState, useEffect } from 'react'

import ChatContainer from '../components/chat';

import {
  Link
} from "react-router-dom";

const typePage = 'dashboard';

declare global {
  interface Window { MyNamespace: any; }
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: any) => void;
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

function Dashboard({user}: any) {
    const [loading, setLoading] = useState(false);
    let socket: Socket;
       
    useEffect(() => {
      setTimeout(() => {
        socket = io('localhost:9090')
        setTimeout(() => {
          emited({}, 'connected', socket)
        }, 1000)
      }, 1000)
    }, []);

    const emited = (data, type, socket) => {
      socket.emit('message', {
        'data': {
          'type': type,
          'receive': data,
          'token': window.localStorage.getItem('token')
        }
      })
    }
    

    return (
      <div className="App">
        <ChatContainer user={user} socket={socket}/>
      </div>
    )
}

export default Dashboard
