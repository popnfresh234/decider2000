
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('phone', function(table) {
      table.increments('id').primary();
      table.text('number').notNull();
      table.integer('poll_id').references('id').inTable('poll');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('phone'),
  ]);
};

