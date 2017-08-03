---
title: "Using Data Annotations to validate models"
tags: [.net, c#, data-annotations, validation]
---

The .NET Framework provides us a set of attributes that we can use to validate objects. By using the namespace `System.ComponentModel.DataAnnotations` we can annotate our model's properties with validation attributes.<!--more-->

There are attributes to mark a property as required, set a maximum length and so on. For example:

```csharp
public class Game
{
    [Required]
    [StringLength(20)]
    public string Name { get; set; }

    [Range(0, 100)]
    public decimal Price { get; set; }
}
```

To check if an instance is valid we can use the following code:

```csharp
Validator.TryValidateObject(obj
    , new ValidationContext(obj)
    , results, true);
```

The return is `true` if the object does not have any errors or `false` if it does have errors. And the parameter `results` is populated with errors, if any. <a href="https://msdn.microsoft.com/en-us/library/dd411772%28v=vs.110%29.aspx" target="_blank">The full definition of this method can be found at MSDN documentation</a>.

To test our Game class we can use the following code:

```csharp
static void Main(string[] args)
{
    ICollection<ValidationResult> results = null;

    var invalidGame = new Game
    {
        Name = "My name is way over 20 characters",
        Price = 300,
    };

    if (!Validate(invalidGame, out results))
    {
        Console.WriteLine(String.Join("\n", results.Select(o => o.ErrorMessage)));
    }
    else
    {
        Console.WriteLine("I'm a valid object!");
    }

    Console.ReadKey(true);
}

static bool Validate<T>(T obj, out ICollection<ValidationResult> results)
{
    results = new List<ValidationResult>();

    return Validator.TryValidateObject(obj, new ValidationContext(obj), results, true);
}
```

Running it results in:
<a href="https://brunolm.files.wordpress.com/2015/03/2015-11-04-12-11-43-490.png"><img class="alignnone size-full wp-image-79" src="https://brunolm.files.wordpress.com/2015/03/2015-11-04-12-11-43-490.png" alt="2015-11-04 12-11-43-490" width="489" height="43" /></a>

If we then change the properties to valid values:

```csharp
var validGame = new Game
{
    Name = "Magicka",
    Price = 5,
};
```

And test again:
<a href="https://brunolm.files.wordpress.com/2015/03/2015-14-04-12-14-55-202.png"><img class="alignnone size-full wp-image-80" src="https://brunolm.files.wordpress.com/2015/03/2015-14-04-12-14-55-202.png" alt="2015-14-04 12-14-55-202" width="161" height="27" /></a>

It is also possible to create your own attributes. All you have to do is inherit from `ValidationAttribute`. In the following example the attribute is going to check if the value is divisible by 7. If not it will return an error message.

```csharp
public class DivisibleBy7Attribute : ValidationAttribute
{
    public DivisibleBy7Attribute()
        : base("{0} value is not divisible by 7")
    {
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        decimal val = (decimal)value;

        bool valid = val % 7 == 0;

        if (valid)
            return null;

        return new ValidationResult(base.FormatErrorMessage(validationContext.MemberName)
            , new string[] { validationContext.MemberName });
    }
}
```

And in the object to be validated:

```csharp
[DivisibleBy7]
public decimal Price { get; set; }
```

If the validation fails it is going to return the following error message:
<a href="https://brunolm.files.wordpress.com/2015/03/2015-31-04-12-31-04-005.png"><img class="alignnone size-full wp-image-81" src="https://brunolm.files.wordpress.com/2015/03/2015-31-04-12-31-04-005.png" alt="2015-31-04 12-31-04-005" width="277" height="25" /></a>
<h2>All built-in validation attributes</h2>
A <a href="https://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.validationattribute(v=vs.110).aspx#inheritanceContinued" target="_blank">full list of validation attributes can be found at MSDN documentation</a>.
