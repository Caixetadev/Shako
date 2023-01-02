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

const connected = async ({token}, knex, io, socket, sendToRoom) => { 
  knex('users').where({
      token: token
    }).select('*').then(async function(rows) {
      if(rows.length > 0){
          const otherUsers = await getOtherUsers(knex, rows[0].id)
          rows[0].password = undefined
          socket.emit('getFriendsChat', await otherUsers)
          return rows[0]
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

module.exports = {validationToken, connected, validationTokenIO}