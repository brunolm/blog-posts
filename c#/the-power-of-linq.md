---
title: "The power of Linq"
tags: [.net, c#, collection, linq]
---

Linq is a powerful feature introduced on .NET 3.5 that allows you to easily query your objects to manipulate data.

Entity Framework uses Linq queries to generate database queries and retrieve the data for you. So you don't have to worry about writing SQL anymore.

Linq also provides methods to work with XML among other things.

<a href="https://msdn.microsoft.com/en-us/library/bb397906.aspx" target="_blank">From MSDN</a>:
<blockquote>Language-Integrated Query (LINQ) is a set of features introduced in Visual Studio 2008 that extends powerful query capabilities to the language syntax of C# and Visual Basic. LINQ introduces standard, easily-learned patterns for querying and updating data, and the technology can be extended to support potentially any kind of data store. Visual Studio includes LINQ provider assemblies that enable the use of LINQ with .NET Framework collections, SQL Server databases, ADO.NET Datasets, and XML documents.</blockquote>
<!--more-->

Linq offers two syntaxes, the normal one:

```csharp
var x = list.Where(o => o > 5);
```

And this other one that you should never ever use because it sucks. :P

```csharp
var x = from n in numbers
where n < 5
select n;
```

<h2>Aggregate</h2>
Allows you to run an accumulate function on a sequence. For example I can get a sum of the values in an array while performing some custom action over a value.

```csharp
var values = new int[] { 1, 2, 3, 4, 5 };

// 29
int result = values.Aggregate((prev, curr) => prev + curr * 2);
```

<h2>All</h2>
Checks if all elements in a collection match a criteria.

```csharp
bool test = values.All(n => n > 0);
```

<h2>Any</h2>
Checks if any elements in a collection match a criteria.

```csharp
bool test = values.Any(n => n > 3);
```

<h2>Average</h2>
Calculates the average value from a collection.

```csharp
var test = values.Average();
```

<h2>Cast</h2>
Attempts to convert the elements of a collection to a type. When it fails it throws an exception.

```csharp
var test = values.Cast<double>();
```

<h2>Count</h2>
Counts the number of items in a collection.

```csharp
var test = values.Count();
```

<h2>Distinct</h2>
Retrieves a collection with only distinct values by using the default equality comparer, but you can specify a different comparer if needed.

```csharp
var test = values.Distinct();
```

<h2>ElementAt</h2>
Retrieves an element from an index. When it fails it throws an exception.

```csharp
var test = values.ElementAt(2);
```

<h2>ElementAtOrDefault</h2>
Retrieves an element from an index. When it fails it returns the default value for the type.

```csharp
var test = values.ElementAtOrDefault(200);
```

<h2>Except</h2>
Retrieves a collection with only distinct elements compared to a second collection by using the default equality comparer, but you can specify a different comparer if needed.

```csharp
var test = values.Except(values2);
```

<h2>First</h2>
Retrieves the first element from a collection. When it fails it throws an exception.

```csharp
var test = values.First();
```

You can specify a condition, for example get the first that is greater than another number:

```csharp
var test = values.First(n => n > 2);
```

<h2>FirstOrDefault</h2>
Retrieves the first element from a collection. When it fails it return the default value for the type.

```csharp
var test = values.FirstOrDefault();
```

You can specify a condition, for example get the first that is greater than another number:

```csharp
var test = values.FirstOrDefault(n => n > 2);
```

<h2>GroupBy</h2>
Groups collections by a key.

```csharp
var people = new List<Person>
{
    new Person { Name = "Bruno", Company = "Bravi" },
    new Person { Name = "Jeff", Company = "Stack Exchange" },
    new Person { Name = "Joel", Company = "Stack Exchange" },
    new Person { Name = "Jon", Company = "Google" },
    new Person { Name = "Scott", Company = "Microsoft" },
};

var groups = people.GroupBy(n => n.Company);

foreach (var group in groups)
{
    string company = group.Key;
    List<Person> peopleInThisCompany = group.ToList();
}
```

<a href="https://brunolm.files.wordpress.com/2015/03/2015-35-08-03-35-03-086.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-35-08-03-35-03-086.png" alt="2015-35-08 03-35-03-086" width="487" height="277" class="alignnone size-full wp-image-186" /></a>

<h2>Intersect</h2>
Retrieves a collection with only equal elements compared to a second collection by using the default equality comparer, but you can specify a different comparer if needed.

```csharp
var test = values.Intersect(values2);
```

<h2>Join</h2>
Just like a database join you can join collections by the given keys.

```csharp

var people = new List<Person>
{
    new Person { Name = "Bruno", CompanyID = 1 },
};

var companies = new List<Company>
{
    new Company { ID = 1, Name = "Bravi" },
};

var results = people.Join(companies,
    person => person.CompanyID,
    company => company.ID,
    (person, company) => new { Person = person, Company = company });

foreach (var item in results)
{
    string personName = item.Person.Name;
    string companyName = item.Company.Name;
}
```

<h2>Last</h2>
Retrieves the last element from a collection. When it fails it throws an exception.

```csharp
var test = values.Last();
```

You can specify a condition, for example get the last that is greater than another number:

```csharp
var test = values.Last(n => n > 2);
```

<h2>LastOrDefault</h2>
Retrieves the last element from a collection. When it fails it return the default value for the type.

```csharp
var test = values.LastOrDefault();
```

You can specify a condition, for example get the last that is greater than another number:

```csharp
var test = values.LastOrDefault(n => n > 2);
```

<h2>Max</h2>
Gets the higher value in a collection.

```csharp
// number of characters from the name with the higher length
int result = people.Max(o => o.Name.Length);
```

<h2>Min</h2>
Gets the lowest value in a collection.

```csharp
var result = new int[] { 10, 20, -50 }.Min();
```

<h2>OfType</h2>
Retrieves from a collection only values that match the type.

```csharp
var list = new List<object>
{
    new Person { Name = "Bruno", CompanyID = 1 },
    new Company { ID = 1, Name = "Bravi" },
};

var people = list.OfType<Person>();
```

<h2>OrderBy</h2>
Order, in an ascending way, the elements of a collection.

```csharp
// -10, 50, 100
var result = new int[] { 100, -10, 50 }.OrderBy(i => i);
```


<h2>OrderByDescending</h2>
Order, in an descending way, the elements of a collection.

```csharp
// 100, 50, -10
var result = new int[] { 100, -10, 50 }.OrderByDescending(i => i);
```

<h2>Select</h2>
Retrieves a collection selecting the object it should return.

```csharp
var people = new List<Person>
{
    new Person { Name = "Bruno", Company = "Bravi" },
    new Person { Name = "Jeff", Company = "Stack Exchange" },
    new Person { Name = "Joel", Company = "Stack Exchange" },
    new Person { Name = "Jon", Company = "Google" },
    new Person { Name = "Scott", Company = "Microsoft" },
};

IEnumerable<string> names = people.Select(person => person.Name);
```

<h2>SelectMany</h2>
Similar to `Select` but used on collections instead.

```csharp
var people = new List<Person>
{
    new Person
    {
        Name = "Bruno",
        Hobbies = new List<string>
        {
            "Programming",
            "Anime", "Manga"
        },
    },

    new Person
    {
        Name = "Someone",
        Hobbies = new List<string>
        {
            "Series",
            "Games"
        },
    },
};

IEnumerable<string> allHobbies = people.SelectMany(person => person.Hobbies);
```

<h2>Single</h2>
Attempt to return a single element from a collection. When it fails (empty list/more than 1 result) it throws an exception.

```csharp
int single = new int[] { 1, 2, 2 }.Single(n => n == 1);

// exception
int single = new int[] { 1, 2, 2 }.Single();
int single = new int[] { 1, 2, 2 }.Single(n => n == 2);
```

<h2>SingleOrDefault</h2>
Attempt to return a single element from a collection. If it does not find any values the default value is returned. When it fails (more than 1 result) it throws an exception.

```csharp
int single = new int[] { 1, 2, 2 }.SingleOrDefault(n => n == 1);
int single = new int[] { 1, 2, 2 }.SingleOrDefault(n => n == 100);

// exception
int single = new int[] { 1, 2, 2 }.SingleOrDefault();
int single = new int[] { 1, 2, 2 }.SingleOrDefault(n => n == 2);
```

<h2>Skip</h2>
Iterates through the collection skipping (not retrieving) N elements.

```csharp
var fiveToSeven = new int[] { 3, 4, 5, 6, 7 }.Skip(2);
```

<h2>SkipWhile</h2>
Iterates through the collection skipping (not retrieving) elements until the condition is met.

```csharp
var fiveToSeven = new int[] { 3, 4, 5, 6, 7 }.SkipWhile(n => n < 5);
```

<h2>Sum</h2>
Adds up all the values in the collection.

```csharp
int result = new int[] { 3, 4, 5, 6, 7 }.Sum();
```

<h2>Take</h2>
Iterates through the collection taking (retrieving) N elements.

```csharp
var threeFour = new int[] { 3, 4, 5, 6, 7 }.Take(2);
```

<h2>TakeWhile</h2>
Iterates through the collection taking (retrieving) elements while the condition is met.

```csharp
var threeFour = new int[] { 3, 4, 5, 6, 7 }.TakeWhile(n => n < 5);
```

<h2>ThenBy</h2>
Performs subsequent ascending ordering on a collection.

```csharp
var people = new List<Person>
{
    new Person { Name = "Dperson", Surname = "Bsurname" },
    new Person { Name = "Bperson", Surname = "Csurname" },
    new Person { Name = "Cperson", Surname = "Bsurname" },
    new Person { Name = "Aperson", Surname = "Csurname" },
};

var result = people
    .OrderBy(person => person.Surname)
    .ThenBy(person => person.Name);
```

<h2>ThenByDescending</h2>
Performs subsequent descending ordering on a collection.

```csharp
var people = new List<Person>
{
    new Person { Name = "Dperson", Surname = "Bsurname" },
    new Person { Name = "Bperson", Surname = "Csurname" },
    new Person { Name = "Cperson", Surname = "Bsurname" },
    new Person { Name = "Aperson", Surname = "Csurname" },
};

var result = people
    .OrderBy(person => person.Surname)
    .ThenByDescending(person => person.Name);
```

<h2>ToDictionary</h2>
Converts a collection to a dictionary.

```csharp
var values = new int[] { 1, 2, 3 };

var valAndDoubles = values.ToDictionary(val => val, val => val * 2);
```

<h2>ToList</h2>
Converts a collection to a list.

```csharp
List<Person> people = values.ToList();
```

<h2>Union</h2>
Unifies two collections.

```csharp
var values1 = new int[] { 1, 2, 3 };
var values2 = new int[] { 3, 4, 5 };

var oneToFive = values1.Union(values2);
```

<h2>Where</h2>
Retrieve elements from a collection where the condition is met.

```csharp
var people = new List<Person>
{
    new Person { Name = "Dperson", Surname = "Bsurname" },
    new Person { Name = "Bperson", Surname = "Csurname" },
    new Person { Name = "Cperson", Surname = "Bsurname" },
    new Person { Name = "Aperson", Surname = "Csurname" },
};

var bSurnamePeople = people.Where(person => person.Surname.StartsWith("B"));
```

<h2>Zip</h2>
Unifies two collections applying a function to each value.

```csharp
var values1 = new int[] { 1, 2, 3 };
var values2 = new int[] { 4, 5, 6 };

// 5, 7, 9
var zipped = values1.Zip(values2, (first, second) => first + second);
```
