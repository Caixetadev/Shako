const {validationToken} = require('../user/validationToken');

const dashboard = async (data, knex, ws, app, io) => {
    ws.send(
        JSON.stringify({
          type: "dashboard",
          sucess: true,
          message: "Connect to webrtc."
        })
    );
    
    //Socket.io
    io.on('connection', (socket) => {
      
    });
}

module.exports = {dashboard}