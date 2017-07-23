---
title: "What's new in C# 7.0"
tags: [.net, .net-core, c#, c#-7.0, roslyn]
---

[Project roslyn](https://github.com/dotnet/roslyn) is bringing good news. A lot of new features are coming up and you can [check the status on GitHub](https://github.com/dotnet/roslyn/blob/master/docs/Language%20Feature%20Status.md) (not all features are guaranteed to make it in time).

I created a [GitHub project - brunolm/csharp-features](https://github.com/brunolm/csharp-features) to show what is coming and how to use it.

<a href="https://github.com/brunolm/csharp-features" target="_blank"><img src="https://brunolm.files.wordpress.com/2017/02/csharp-7-features.png" alt="csharp new features" width="625" height="469" class="alignnone size-full wp-image-666" /></a>

<!--more-->

## [Binary Literals](https://github.com/dotnet/roslyn/issues/215)

Now you can write binary codes directly:

```csharp
var bin = 0b1010;
```

## [DigitsSeparator](https://github.com/dotnet/roslyn/issues/216)

Now it is easier to see if you need more or less zeros.

```csharp
var bin = 0b00001010_10010011;
var num = 8_000_000_000;
var hex = 0xAB_CD_EF;
```

## [Throw Exception Inline](https://github.com/dotnet/roslyn/blob/master/docs/features/throwexpr.md)

Now you can throw an exception in a ternary operator.

```csharp
var x = true ? throw new ArgumentNullException() : false;
```

## Catch When

You can catch errors only if some condition is met.

```csharp
catch (Exception ex) when (ex.Message.EndsWith("!"))
```

## Expression Bodied Everything

Now you can use expression bodied in "everything".

```csharp
class Person
{
    private IList names = new List();

    public Person(string name) =&gt; names.Add(name);
    ~Person() =&gt; names.Clear();

    public int Total
    {
        get =&gt; names.Count;
    }
}
```

## [Local Functions](https://github.com/dotnet/roslyn/blob/master/docs/features/local-functions.md)

You can now declare functions inside your methods.

```csharp
public void Calc()
{
    int fib()
    {
        return 1;
    }

    int x = fib();
}
```

## Out Vars

You can do this in a one-line now.

```csharp
int.TryParse("1337", out int n)
```

You can use `var`

```csharp
int.TryParse("1337", out var n)
```

If there are multiple `out` parameters:

```csharp
public void GetCoords(out int x, out int y, out int z)
```

You can discard what you don't want using `out _`:

```csharp
GetCoords(out int x, out _, out _);
```

See [discards](https://github.com/dotnet/roslyn/blob/master/docs/features/discards.md) and [wildcards work](https://github.com/dotnet/roslyn/blob/master/docs/features/wildcards.work.md).

## Pattern Matching - IS

You can check if a variable `is` something and create another one in that type immediately:

```csharp
IShape o = new Circle();
if (o is Circle c) /* something with variable c */
```

## Pattern Matching - Switch

Switches can now combine `is` and `when`. There is also a special `case null` that will catch (even with the `default` before it) when `shape` is null.

```csharp
public void Switch()
{
    IShape shape = new Square();

    switch (shape)
    {
        case Circle c when (c.Length == 5):
            break;
        case Circle c:
            break;
        case Square s:
            break;
        default:
            break;
        case null: // special case, does not fall in default
            break;
    }
}
```

## Ref Returns

It allows you to return the address of the value and modify the value.

```csharp
public void Usage()
{
    int[] arr = { 5, 4, 3, 2, 1 };

    ref int Find(int n)
    {
        for (int i = 0; i < arr.Length; ++i)
        {
            if (arr[i] == n)
            {
                return ref arr[i];
            }
        }

        throw new System.Exception();
    }

    ref int pos = ref Find(5);
    pos = 100;

    System.Console.WriteLine(arr); // { 100, 4, 3, 2, 1 };
}
```

## Tuples

To use tuples today you need to install a package:

```powershell
# Core
dotnet add package System.ValueTuple

# Nuget
Install-Package "System.ValueTuple" -IncludePrerelease
```

Allows you to return more than one value at once. Usually you would need to create a class to return multiple things, now you can:

```csharp
public (int, int) GetCoords()
{
    return (1, 2);
}

var (x, y) = GetCoords();
(var w, var z) = GetCoords();
```

If the return types are not named and you attempt to get all values in a single var, it will return an object with `Item1`, `Item2`...

```csharp
var all = GetCoords();
// all.Item1
// all.Item2
```

You can change the method signature to return an object with named properties

```csharp
public (int x, int y) GetCoordsNamed() {}

var obj = GetCoordsNamed();
// obj.x
// obj.y
```

And there are more planned but apparently not yet available, like non-nullable vars `string! notNullString`.

I'm quite happy to see these new features, allowing C# to be more flexible, reducing the amount of code needed to do things. I hope you are enjoying too :)
