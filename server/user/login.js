const userLogin = async ({email, password}, knex, ws, app, io) => {
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
                  noMessageError: false,
                  message: "Logged with sucess."
                })
            );
        } else{
            ws.send(
                JSON.stringify({
                  type: "login",
                  user: {},
                  sucess: false,
                  noMessageError: false,
                  message: "E-mail or password incorrects."
                })
            );
        }
      })
    } else{
      JSON.stringify({
        type: "login",
        user: {},
        sucess: false,
        noMessageError: false,
        message: "E-mail or password is not valid"
      })
    }
}

module.exports = {userLogin}