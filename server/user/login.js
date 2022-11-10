const userLogin = async ({email, password}, knex, ws) => {
    if(email && password){
      knex('users').where({
        email: email,
        password:  password
      }).select('*').then(function(rows) {
        if(rows.length > 0){
            rows[0].password = undefined
            ws.send(
                JSON.stringify({
                  type: "login",
                  user: rows[0],
                  sucess: true,
                  noMessageError: false
                })
            );
        } else{
            ws.send(
                JSON.stringify({
                  type: "login",
                  user: {},
                  sucess: false,
                  noMessageError: false
                })
            );
        }
      })
    }
}

module.exports = {userLogin}