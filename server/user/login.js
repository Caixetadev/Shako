const userLogin = async ({email, password}, knex, ws) => {
    knex('users').where({
        email: email,
        password:  password
      }).select('*').then(function(rows) {
        if(rows.length > 0){
            rows[0].password = undefined
            ws.send(
                JSON.stringify({
                  type: "login_sucess",
                  user: rows[0],
                  sucess: true
                })
            );
        } else{
            ws.send(
                JSON.stringify({
                  type: "login_failed",
                  user: {},
                  sucess: false
                })
            );
        }
      })
}

module.exports = {userLogin}