const validationToken = async ({token}, knex, ws, app) => {
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
        }
      })
}

module.exports = {validationToken}