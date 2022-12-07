const {userRegister} = require('../user/register');
const {userLogin} = require('../user/login');
const {validationToken} = require('../user/validationToken')
const {dashboard} = require('../app/dashboard')

const parseMessage = async ({type, data}, ws, knex, app) => {
    try {
        await types[type](data, knex, ws, app)
    } catch (error) {
        //console.log('Why so many codes, if your life its no have sense')
    }
}

const types = {
    'userRegister': userRegister,
    'userLogin': userLogin,
    'validationToken': validationToken,
    'app': dashboard
}

module.exports = {parseMessage}