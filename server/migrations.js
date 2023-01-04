const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "shako",
  },
});

const up = function (knex) {
  Promise.all([
    knex.schema.createTableIfNotExists("users", function (table) {
      table.increments("id");
      table.string("username", 255).notNullable();
      table.string("token", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 255).notNullable();
      table.string("discrimination", 255).notNullable();
      table.longtext("avatar", 16383).notNullable();
      table.longtext("bg", 16383).notNullable();
      table.string("admin", 255).notNullable();
    }),
  ]);

  Promise.all([
    knex.schema.createTableIfNotExists("friends", (table) => {
      // cria uma coluna de ID como uma chave primária e auto-incrementada
      table.increments("id").primary();
      // cria uma coluna para armazenar o ID do usuário que recebeu a solicitação de amizade
      table.integer("receiver_id").notNullable();
      // cria uma coluna para armazenar o status da solicitação de amizade (aceita ou pendente)
      table.string("status").notNullable();
      // define as colunas de sender_id e receiver_id como chaves estrangeiras que se referem à tabela de usuários
      table.string("sender_id").notNullable();
    }),
  ]);
};

//Migrations
up(knex);

module.exports = { knex };
