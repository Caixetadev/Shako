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

const userRegister = async ({email, password, username}, knex, ws) => {
    const token = generateToken(199)
    let discrimi = await knex('users')
    .select('*')
    .forUpdate()
    .noWait()

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
                admin: '',
                avatar: '',
                bg: '',
                discrimination: discrimi
            }).then(()=>{}) //working
        }
    })
    .catch(function(ex) {
        
    })
}

module.exports = {userRegister}