const {getOtherUsers} = require('../user/getUsers');

const validationToken = async ({token}, knex, ws) => {
    knex('users').where({
        token: token
      }).select('*').then(function(rows) {
        if(rows.length > 0){
            rows[0].password = undefined
            ws.send(
                JSON.stringify({
                  type: "login",
                  user: rows[0],
                  sucess: true,
                  noMessageError: true,
                  message: ""
                })
            );
            return rows[0]
        } else{
            ws.send(
                JSON.stringify({
                  type: "login",
                  user: {},
                  sucess: false,
                  noMessageError: true,
                  message: ""
                })
            );
            return {}
        }
      })
}

const userConnectToRoom = async ({username}, room, socket) => {
  //Connect to room using socket
  socket.join(room);
  console.log(`Usuario ${username} entrou na sala ${room} privada.`)
  socket.emit('connected', {'user': username, 'sucess': true})
}


const connected = async ({token}, knex, io, socket, sendToRoom, receive) => { 
  knex('users').where({
      token: token
    }).select('*').then(async function(rows) {
      if(rows.length > 0){
          const otherUsers = await getOtherUsers(knex, rows[0].id)
          rows[0].password = undefined
          socket.emit('getFriendsChat', await otherUsers)
          await userConnectToRoom(rows[0], `${token}-${rows[0].id}`, socket)
          return rows[0]
      }
    })
}

const getOtherUsersChat = async ({token}, knex, io, socket, sendToRoom, receive) => { 
  knex('users').where({
      token: token
    }).select('*').then(async function(rows) {
      if(rows.length > 0){
          const otherUsers = await getOtherUsers(knex, rows[0].id)
          socket.emit('getFriendsChat', await otherUsers)
      }
    })
}

const validationTokenIO = async ({token}, knex, io, socket, sendToRoom) => {
  knex('users').where({
      token: token
    }).select('*').then(function(rows) {
      if(rows.length > 0){
          rows[0].password = undefined
          return rows[0]
      }
      return {}
    })
}

module.exports = {validationToken, connected, validationTokenIO, getOtherUsersChat}