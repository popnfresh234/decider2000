
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('poll', function(table) {
      table.increments('id').primary();
      table.string('ptitle').notNull();
      table.string('email').notNull();
    }),
    knex.schema.createTable('option', function(table) {
      table.increments('id').primary();
      table.string('title').notNull();
      table.string('description');
      table.integer('rank').defaultTo(0);
      table.integer('poll_id').references('id').inTable('poll');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('option'),
    knex.schema.dropTable('poll'),
  ]);
};
