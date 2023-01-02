import { useState, useEffect } from 'react'

import {
  BrowserRouter,
  Route,
  Link
} from "react-router-dom"


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

function ChatContainer({user}: {user: User}, {socket}: {socket: Socket}) {
  const [user_atual, setUser] = useState<User>(user);
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    socket.on('getFriendsChat', (friends: User[]) => {
      setUsers(friends)
    })
  }, [])

  return (
    <div className="Chat_Container">
      <div className='left_chat'>
        <ul>
          { users?.map((user) => (
            <li>
              { user?.username }
            </li>
          )) }
        </ul>
      </div>
    </div>
  )
}

export default ChatContainer
