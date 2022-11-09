const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '31415',
      database : 'shako'
    }
});

const up = function (knex) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', function (table) {
            table.increments('id');
            table.string('username', 255).notNullable();
            table.string('token', 255).notNullable();
            table.string('email', 255).notNullable();
            table.string('password', 255).notNullable();
            table.string('discrimination', 255).notNullable();
            table.longtext('avatar', 16383).notNullable();
            table.longtext('bg', 16383).notNullable();
            table.string('admin', 255).notNullable();
      })
    ]);
};

//Migrations
up(knex);

module.exports = {knex}