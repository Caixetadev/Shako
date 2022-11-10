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
                  sucess: true
                })
            );
        } else{
            ws.send(
                JSON.stringify({
                  type: "login",
                  user: {},
                  sucess: false
                })
            );
        }
      })
}

module.exports = {validationToken}