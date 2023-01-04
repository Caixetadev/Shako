function getOtherUsers(knex, currentUserId) {
    return knex('users').where('id', '!=', currentUserId).map((user) => user.token = undefined);
}

module.exports = {getOtherUsers}