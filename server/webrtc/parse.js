const {userRegister} = require('../user/register');
const {userLogin} = require('../user/login');
const {validationToken} = require('../user/validationToken')

const parseMessage = async ({type, data}, ws, knex, app, io) => {
    try {
        await types[type](data, knex, ws)
    } catch (error) {
        //console.log('Why so many codes, if your life its no have sense')
    }
}

const types = {
    'userRegister': userRegister,
    'userLogin': userLogin,
    'validationToken': validationToken
}

module.exports = {parseMessage}