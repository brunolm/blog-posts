---
title: Linq: Deferred Execution
tags: [c#, collection, linq]
---

Linq queries are build as you call linq methods but they are not executed until you use the collection.<!--more-->

For example:

[code language="csharp"]
var result = new int[] { 1, 2, 3, 4, 5 }.Where(n => n > 2);
[/code]

<code>result</code> does not yet contain the resulting values. But if you iterate through it:

[code language="csharp"]
foreach (var item in result)
{
}
[/code]

It will run the query and return the resulting values.

There are other ways to run it, you could call <code>ToList()</code>, <code>ToDictionary()</code>, <code>Count()</code>...

This feature allows you to only query when really needed so it won't consume any unnecessary resources.

You just have to be careful when dealing with database. If you defer the execution of a query but then dispose of the DbContext you are going to get an exception. Because the framework can't run your query on a disposed connection. For example:

[code language="csharp"]
IEnumerable<Person> people;

using (var db = new ApplicationDbContext())
{
    people = db.People;
}

// exception!
foreach (var item in people)
{
}
[/code]

Instead what you have to do is:

[code language="csharp"]
IEnumerable<Person> people;

using (var db = new ApplicationDbContext())
{
    people = db.People.ToList(); // causes query execution
}

// ok
foreach (var item in people)
{
}
[/code]
