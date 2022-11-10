const {userRegister} = require('../user/register');
const {userLogin} = require('../user/login');
const {validationToken} = require('../user/validationToken')

const parseMessage = async ({type, data}, ws, knex) => {
    try {
        await types[type](data, knex, ws)
    } catch (error) {
        
    }
}

const types = {
    'userRegister': userRegister,
    'userLogin': userLogin,
    'validationToken': validationToken
}

module.exports = {parseMessage}