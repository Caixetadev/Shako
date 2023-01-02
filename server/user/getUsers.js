function getOtherUsers(knex, currentUserId) {
    return knex('users').where('id', '!=', currentUserId);
}

module.exports = {getOtherUsers}