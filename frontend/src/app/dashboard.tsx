import { useState, useEffect } from 'react'

import {
  Link
} from "react-router-dom"

const typePage = 'dashboard'

import io, { Socket } from 'socket.io-client';
const ws = new WebSocket('ws://localhost:9000/ws/app')

function Dashboard({user}: any) {
    
    useEffect(() => {
        
        const data = {type: 'app', data: {}};
        ws.send(stringy(data))

        let socket: Socket;
        const ENDPOINT = 'localhost:5000/dashboard';
        
        socket = io(ENDPOINT);
        socket.emit('join', { name: 'Paola', room: '1' }, () => {});
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