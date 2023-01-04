async function getOtherUsers(knex, currentUser, sendToRoom, io, socket) {
    const users_ = []
    const users = await knex('users').where('id', '!=', currentUser.id).then(function(rows) {
        rows.map((user) => {
            user.password = undefined
            user.token = undefined
            users_.push(user)
        })
    })
    return users_
}

module.exports = {getOtherUsers}