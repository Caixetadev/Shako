async function getOtherUsers(knex, currentUserId) {
    const users_ = []
    const users = await knex('users').where('id', '!=', currentUserId).then(function(rows) {
        rows.map((user) => {
            user.password = undefined
            user.token = undefined
            users_.push(user)
            console.log(users_)
        })
    })
    return users_
}

module.exports = {getOtherUsers}