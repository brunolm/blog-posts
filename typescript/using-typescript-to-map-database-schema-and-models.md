---
title: Using TypeScript to map database schema and models
tags: [typescript]
---

Imagine a large scale application, with a big database full of tables and columns. Now imagine that you will have to remove a column from one of the tables, how would you guarantee that removing that column will not cause issues on your application?

In C# using Code First or Entity models that would be easy, your application would break when trying to reference something that no longer exist. In JavaScript you don't get to know where things are being referenced, but if you use TypeScript there is a way to keep track of it.

Normally in JavaScript you would see code like this:

```js
await knex('student').where('deleted', false);
```
<!--more-->

In this case if you remove the column `deleted` from the database you wouldn't get an error in compile-time, you would only see the issue in runtime. To detect such changes you can use [TypeScript 2.1+ feature `keyof`](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#typescript-21).

For the table `student` I have the following structure:

```
id | name | createdAt  | deleted
--------------------------------
1  | foo  | 2017-01-13 | false
```

Which I map to a `Student` interface.

```js
interface Student {
  id: number;
  name: string;
  createdAt: Date;
  deleted: boolean;
}
```

Now with that we can create an interface that will contain the keys of our model mapped to strings.

```js
const cols: { [P in keyof Student]: string } = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  deleted: 'deleted',
};

const tables = { student: 'student' };
```

And we can finally change our database query to:

```js
await knex(tables.student).where(cols.deleted, false);
```

This way any changes on the model will require changes on the `cols` variable. If we remove a column we will get errors in all places it was referenced. It also means we can rename columns without effort.
