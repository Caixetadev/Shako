const discriminationParse = number => {
    const str = "" + number
    const pad = "0000"
    const ans = pad.substring(0, pad.length - str.length) + str
    return ans
}

const userRegister = async ({email, password, username}, knex) => {
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
                token: '000',
                admin: '0',
                avatar: '00',
                bg: '000',
                discrimination: discrimi
            }).then(()=>{}) //working
        }
    })
    .catch(function(ex) {
        
    })
}

module.exports = {userRegister}