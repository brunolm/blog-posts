---
title: Setting up Entity Framework with Code First and Code Migrations
tags: [c#, code-migrations, entity-framework]
---

The Entity Framework is a Microsoft created Framework that allows developers to easily retrieve data from database.

From Microsoft:
<blockquote>Entity Framework (EF) is an object-relational mapper that enables .NET developers to work with relational data using domain-specific objects. It eliminates the need for most of the data-access code that developers usually need to write.</blockquote>
Entity Framework supports the Code First approach, which means you can develop an application focusing on your code. You can define your models and the framework will generate the database from it. You can work with a database without writing a single SQL line.<!--more-->

The first step is to install the Entity Framework from the Nuget Package Manager.

<a href="https://brunolm.files.wordpress.com/2015/03/2015-53-03-08-53-55-711.png"><img class="alignnone size-full wp-image-65" src="https://brunolm.files.wordpress.com/2015/03/2015-53-03-08-53-55-711.png" alt="2015-53-03 08-53-55-711" width="591" height="70" /></a>

After it is installed we can start coding with it. Let's say we want to store our system Users and allow them to create new Posts. So our models in this scenario will be <code>User</code> and <code>Post</code>.

[code language="csharp"]
public class User
{
    public User()
    {
        Posts = new List<Post>();
    }

    public int ID { get; set; }

    public string Name { get; set; }

    public virtual ICollection<Post> Posts { get; set; }
}

public class Post
{
    public int ID { get; set; }

    public string Name { get; set; }

    public string Text { get; set; }

    public User Owner { get; set; }
}
[/code]

Whenever we use Entity Framework we create an instance of a <code>DbContext</code> and access the database through it. To use our models we have to tell Entity Framework that they belong on the data context. To do that we can inherit from <code>DbContext</code> and add properties of <code>DbSet&lt;T&gt;</code> to it.

[code language="csharp"]
public class ApplicationContext : DbContext
{
    public ApplicationContext()
        : base("EntityFrameworkDemo")
    {

    }

    public DbSet<User> Users { get; set; }

    public DbSet<Post> Posts { get; set; }
}
[/code]

By doing it we are basically saying that our database has two tables: "Users" and "Posts".

The <a href="https://msdn.microsoft.com/en-us/library/gg679467(v=vs.113).aspx" target="_blank"><code>DbContext</code> constructor</a> in this case is taking a string parameter which is specifying the database name it is going to create. It is also possible to send a ConnectionString name and it will automatically resolve from the config file.

Finally to test our little setup we can build a quick block of code and see what happens.

In the example bellow I am creating two Users and two Posts. Each post has an owner.

[code language="csharp"]
static void Main(string[] args)
{
    using (var db = new ApplicationContext())
    {
        var user1 = new User { Name = "Bruno" };
        var user2 = new User { Name = "Michels" };
        db.Users.Add(user1);
        db.Users.Add(user2);
        db.SaveChanges(); // commit changes


        var post1 = new Post { Name = "Entity Framework", Text = "Example using EF" };
        var post2 = new Post { Name = "Another post", Text = "Another example using EF" };

        post2.Owner = user2;

        user1.Posts.Add(post1);
        db.Posts.Add(post2);

        db.SaveChanges(); // commit changes
    }
}
[/code]

A <code>SELECT * FROM Users</code> returns:
<a href="https://brunolm.files.wordpress.com/2015/03/2015-31-03-09-31-38-917.png"><img class="alignnone size-full wp-image-67" src="https://brunolm.files.wordpress.com/2015/03/2015-31-03-09-31-38-917.png" alt="2015-31-03 09-31-38-917" width="89" height="75" /></a>

A <code>SELECT * FROM Posts</code> returns:
<a href="https://brunolm.files.wordpress.com/2015/03/2015-32-03-09-32-35-845.png"><img class="alignnone size-full wp-image-68" src="https://brunolm.files.wordpress.com/2015/03/2015-32-03-09-32-35-845.png" alt="2015-32-03 09-32-35-845" width="336" height="75" /></a>

We can see that Entity Framework automatically created the database and tables, along with primary keys, foreign keys and everything we need for us. We didn't write a single line o SQL code.

Now lets look back at the code and retrieve data instead. Lets say we want to get all posts by a user id. In our <code>Post</code> class we don't have the user id, only the <code>User</code> object... And as you could see Entity Framework generated a column called <code>Owner_ID</code> for us. We can change it by adding:

[code language="csharp"]
public int OwnerID { get; set; }
[/code]

To our <code>Post</code> class. By convention Entity Framework will see that the name matches with the owner property and automatically use it as the index instead of generating one.

If we try to run our application we will get an error saying that the model changed since it was last created. This is because we changed the database, but as it already exists Entity Framework can't re-create it.

We can either drop the database and let it create again or we can use <em>Code Migrations</em>.

Code Migrations are automatically generated files that know how to update the state of the database. To use them we have to open the Package Manager console under View &gt; Other Windows, then type:

[code]Enable-Migrations[/code]

This is going to allow migration files to be created. We can then add a migration to our latest changes by typing:

[code]Add-Migration <name>[/code]

And finally update the database by typing:

[code]Update-Database[/code]

Now that our database has been update we can use it again.

<a href="https://brunolm.files.wordpress.com/2015/03/2015-53-03-09-53-55-480.png"><img class="alignnone size-full wp-image-72" src="https://brunolm.files.wordpress.com/2015/03/2015-53-03-09-53-55-480.png" alt="2015-53-03 09-53-55-480" width="258" height="75" /></a>

Notice that there is a Configuration file. It is created when you Enable-Migrations. You can change it to set:

[code language="csharp"]
AutomaticMigrationsEnabled = true;
[/code]

This allows you to change your models without having to create migrations manually. But you will still have to update the database manually by typying Update-Database.

Lets change our application to retrieve all posts from a user given and ID.

[code language="csharp"]
static void Main(string[] args)
{
    using (var db = new ApplicationContext())
    {
        var posts = db.Posts.Where(o => o.OwnerID == 1).ToList();
    }
}
[/code]

<a href="https://brunolm.files.wordpress.com/2015/03/2015-49-03-09-49-48-104.png"><img class="alignnone size-full wp-image-71" src="https://brunolm.files.wordpress.com/2015/03/2015-49-03-09-49-48-104.png" alt="2015-49-03 09-49-48-104" width="453" height="164" /></a>
