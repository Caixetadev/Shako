const discriminationParse = number => {
    const str = "" + number
    const pad = "0000"
    const ans = pad.substring(0, pad.length - str.length) + str
    return ans
}

const generateToken = (length) => {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

const userRegister = async ({email, password, username}, knex, ws, app, io) => {
    if(email && password && username){
        const token = generateToken(199)
        let discrimi = await knex('users')
        .select('*')
        .forUpdate()
        .noWait()

        //Discrimination parse
        discrimi = discriminationParse(discrimi.length + 1)

        knex('users')
        .select()
        .where('email', email)
        .then(function(rows) {
            if (rows.length === 0) {
                // no matching records found
                knex('users').insert(
                {
                    email: email, 
                    password: password,
                    username: username,
                    token: token,
                    admin: '0',
                    avatar: '',
                    bg: '',
                    discrimination: discrimi
                }).then(()=>{
                    ws.send(
                        JSON.stringify({
                            type: "register",
                            redirectUrl: "/login",
                            sucess: true,
                            redirect: true,
                            message: "Register sucessfuly."
                        })
                    )
                })
            } else{
                ws.send(
                    JSON.stringify({
                        type: "register",
                        redirectUrl: "/register",
                        sucess: false,
                        redirect: false,
                        message: "E-mail already exist. Try again with other e-mail."
                    })
                )
            }
        })
        .catch(function(ex) {
            
        })
    } else{
        JSON.stringify({
          type: "register",
          redirectUrl: "/register",
          sucess: false,
          redirect: false,
          message: "E-mail or password is not valid"
        })
      }
}

module.exports = {userRegister}