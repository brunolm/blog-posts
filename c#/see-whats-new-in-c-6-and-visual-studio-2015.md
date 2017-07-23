---
title: "See what's new in C# 6 and Visual Studio 2015"
tags: [.net-4.6, c#, c#-6.0, visual-studio-2015]
---

The upcoming versions are C# 6.0, .NET 4.6, Visual Studio 2015. This post talks about the great things that are coming our way.
<!--more-->

From the official project page, <a href="https://github.com/dotnet/roslyn" target="_blank">Roslyn on Github</a>: <a href="https://github.com/dotnet/roslyn/wiki/Languages-features-in-C%23-6-and-VB-14" target="_blank">C# 6.0 Features</a>.

From MSDN Blog, <a href="http://blogs.msdn.com/b/visualstudio/archive/2014/11/12/the-c-and-visual-basic-code-focused-ide-experience.aspx" target="_blank">IDE features</a>.
<h2>C# 6.0</h2>
<h3>Null Conditional Operator</h3>
I bet you have loads of null checks in your code before attempting to call method on instances. With this new operator this becomes so much easier and clean.

For example, if you have a structure like this:

[code language="csharp"]
public class Sample
{
    public Foo FooProperty { get; set; }
}

public class Foo
{
    public Bar BarProperty { get; set; }
}

public class Bar
{
    public void DoSomething()
    {
        Console.WriteLine("Doing something");
    }
}
[/code]

And you wanted to call <code>Bar.DoSomething</code> you would have to check if the instances are not null until you get there:

[code language="csharp"]
static void Main(string[] args)
{
    Sample nullSample = null;

    if (nullSample != null
        && nullSample.FooProperty != null
        && nullSample.FooProperty.BarProperty != null)
    {
        nullSample.FooProperty.BarProperty.DoSomething();
    }
}
[/code]

With this new null conditional operator you can simplify to this:

[code language="csharp"]
static void Main(string[] args)
{
    Sample nullSample = null;

    nullSample?.FooProperty?.BarProperty?.DoSomething();
}
[/code]

<h3>Auto-Property Initializers</h3>
Sometimes you need to instantiate a class and set some default values to some of the properties, when you need that you often do it in the constructor.

[code language="csharp"]
public class Sample
{
    public Sample()
    {
        Name = "Default initial value";
    }
    public string Name { get; set; }
}
[/code]

With the Auto-Property Initializer your can do the same without having to set it on the constructor.

[code language="csharp"]
public class Sample
{
    public string Name { get; set; } = "Default initial value";
}
[/code]

<h3>Primary Constructors (not in this release)</h3>
<a href="https://roslyn.codeplex.com/discussions/568820" target="_blank">Not planned for the first release</a>, but they didn't discard the idea. Primary constructors allows you to basically have a class with parameters.

[code language="csharp"]
public class Sample(string name)
{
    public string Name { get; set; } = name;
}
[/code]

<h3>Nameof Expressions</h3>
The <code>nameof</code> expression lets you grab the name of the variable you are working with. It can be used in the <code>NotifyPropertyChanged</code> method, for example:

[code language="csharp"]
public class Sample : INotifyPropertyChanged
{
    private string name;

    public string Name
    {
        get { return name; }
        set
        {
            name = value;
            NotifyPropertyChanged(nameof(Name));
        }
    }

    public void NotifyPropertyChanged(string propName)
    {
        if (PropertyChanged != null)
            PropertyChanged(this,
                new PropertyChangedEventArgs(propName));
    }

    public event PropertyChangedEventHandler PropertyChanged;
}
[/code]

It could also be used on an exception:

[code language="csharp"]
public void DoSomething(object someParam)
{
    if (someParam == null)
    {
        throw new ArgumentNullException(nameof(someParam));
    }
    //...
}
[/code]

So rather than hard-coding magic strings you can use this expression.
<h3>String interpolation</h3>
You often have to write:

[code language="csharp"]
String.Format("hello {0}", sample.Name);
[/code]

And the code might require new parameters so you have to put more numbers and always keep them in the correct order. It can grow and become very confusing. To solve this problem they are introducing the string interpolation which allows us to add parameter values directly in the string.

To do that you have to prefix your string with the <code>$</code> symbol.

[code language="csharp"]
String.Format($"hello {sample.Name}");
[/code]

<h3>Expression-bodied Members</h3>
You can define method bodies using lambdas.

[code language="csharp"]
public class Sample
{
    public string Name { get; } = "Foo";

    public override string ToString() => Name;
}
[/code]

<h3>Exception filters</h3>
You can choose when to catch an exception, for example:

[code language="csharp"]
public void DoSomething()
{
    bool exceptionCatchingEnabled = true;

    try
    {
    }
    catch (Exception) when (exceptionCatchingEnabled)
    {
    }
}
[/code]

<h2>Visual Studio 2015</h2>

<h3>Improved ToolTips</h3>
Now tooltips include colors, glyph and more information.

<a href="https://brunolm.files.wordpress.com/2015/03/2015-51-07-04-51-27-708.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-51-07-04-51-27-708.png" alt="2015-51-07 04-51-27-708" width="382" height="123" class="alignnone size-full wp-image-174" /></a>

<a href="https://brunolm.files.wordpress.com/2015/03/2015-52-07-04-52-24-884.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-52-07-04-52-24-884.png" alt="2015-52-07 04-52-24-884" width="334" height="83" class="alignnone size-full wp-image-175" /></a>

<h3>Code Fixes and Refactoring</h3>
Now unused namespaces are grayed out suggesting you can get rid of them.

<a href="https://brunolm.files.wordpress.com/2015/03/2015-53-07-04-53-06-414.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-53-07-04-53-06-414.png" alt="2015-53-07 04-53-06-414" width="255" height="124" class="alignnone size-full wp-image-176" /></a>

There are more options to fix the code and you can preview the changes inline.

<a href="https://brunolm.files.wordpress.com/2015/03/2015-54-07-04-54-30-512.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-54-07-04-54-30-512.png" alt="2015-54-07 04-54-30-512" width="700" height="366" class="alignnone size-full wp-image-177" /></a>

<h4>Removing temporary variables</h4>

Converts this:

[code language="csharp"]
int val = 1 + 2;
Sample.DoSomething(val);
[/code]

To this:

[code language="csharp"]
Sample.DoSomething(1 + 2);
[/code]

<h4>Inline rename</h4>

Can inline-rename variables by pressing <kbd>F2</kbd>.

<a href="https://brunolm.files.wordpress.com/2015/03/2015-03-07-05-03-35-101.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-03-07-05-03-35-101.png" alt="2015-03-07 05-03-35-101" width="449" height="296" class="alignnone size-full wp-image-180" /></a>

<h3>Window Layouts</h3>

You can customize your windows and save them. To do that go to the Window menu &gt; Save Window Layout, give it a name and save. You can have multiple Window Layouts that can be loaded at anytime. The shortcut keys are <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>1, 2, 3...</kbd>.

<h2>More</h2>

See more <a href="https://www.visualstudio.com/en-us/news/vs2015-preview-vs" target="_blank">at Visual Studio 2015 Preview page</a>.
