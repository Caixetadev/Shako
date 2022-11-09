const {userRegister} = require('../user/register');

const parseMessage = async ({type, data}, ws, knex) => {
    try {
        await types[type](data, knex)
    } catch (error) {
        
    }
}

const types = {
    'userRegister': userRegister
}

module.exports = {parseMessage}
