---
title: "knex: a Library to Access Databases"
tags: [database, javascript, knex]
---

[`knex`](https://www.npmjs.com/package/knex) is a npm module that works with:

- MSSQL
- MySQL
- PostgreSQL
- SQLite3
- WebSQL
- Oracle
<!--more-->


You can easily retrieve database data using functions, similar to C#'s Linq. First you need to configure, example config for Postgres:

```js
{
  name: 'global',
  client: 'pg',
  debug: false,
  connection: {
    multipleStatements: true,
    host: url.parse(process.env.DB_PORT).hostname,
    user: process.env.DB_USER,
    port: parseInt(url.parse(process.env.DB_PORT).port, 10),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: `${__dirname}/../db/migrations`,
  },
}
```

env

```js
  environment:
    POSTGRES_USER: user
    POSTGRES_PASSWORD: password
    POSTGRES_DB: test
```

And to use it you have to create a connection passing the config:

```js
const db = knex(config);
```

After that you can start building queries:

```js
const query = db('table_name').where('id', 5);
```

Just like C# it has a deferred execution. To actually make the query run you have to call it with `await`:

```js
await query; // performs database query
// or query.then() if you are using old stuff
```

You can also make queries with a transaction:

```js
try {
  await db.transaction(async (trx) => {
    await db('user').insert({ name: 'Saitama' });
    await db('user').insert({ name: 'Genos' });

    await trx.commit(); // call this to submit all queries
    // await trx.rollback(); // this will throw and not run the queries
  });
}
catch (err) {
  console.log('Rollback happened');
}
```

Like in C#, you can use Migrations, and also Seeds. You have to specify a directory where your migrations files are, and put the files in order they have to execute.

A migration file might look like this:

```js
function up(knex) {
  return knex
    .schema

    .createTable('user', table => {
      table.increments('id').unsigned().primary();
      table.timestamp('createdAt').notNullable()
        .defaultTo(knex.raw('now()'));
      table.timestamp('updatedAt');
      table.boolean('deleted').notNullable().defaultTo(false);

      table.string('name').notNullable();
    })
    ;
}

function down(knex) {
  return knex
    .schema
    .dropTable('user');
}

module.exports = {
  up,
  down,
};
```

To run all migrations:

```
await db.migrate.latest();
```

Basically it has to export two functions, one called `up` that will for example create things and one called `down` that will revert the things you created on `up`. Both functions receive a parameter `knex` which is the object
