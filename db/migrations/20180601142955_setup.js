exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name', 128);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.integer('userId').unsigned();
      table.foreign('userId').references('users.id');
      table.text('text');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('tags', (table) => {
      table.increments('id').primary();
      table.string('tag', 16);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('post_tags', (table) => {
      table.increments('id').primary();
      table.integer('postId').unsigned();
      table.foreign('postId').references('posts.id');
      table.integer('tagId').unsigned();
      table.foreign('tagId').references('tags.id');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('post_tags'),
    knex.schema.dropTable('tags'),
    knex.schema.dropTable('posts')
  ]);
