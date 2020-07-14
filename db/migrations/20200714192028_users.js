exports.up = function (knex) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.increments('user_id').primary();
    usersTable.string('username').unique().notNullable();
    usersTable.string('name').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
