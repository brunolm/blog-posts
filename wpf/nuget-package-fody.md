---
title: Nuget Package: Fody
tags: [c#, fody, il-injection, nuget-package, weaver]
---

Fody is a Nuget Packaged that allows you to decorate your code with attributes and from them generate code automatically through IL injection.

From the official project:

<blockquote>Manipulating the IL of an assembly as part of a build requires a significant amount of plumbing code. This plumbing code involves knowledge of both the MSBuild and Visual Studio APIs. Fody attempts to eliminate that plumbing code through an extensible add-in model.</blockquote>

It is also the name of this cute little bird :)

<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Foudia_madagascariensis_-_W%C3%BCstenhaus_6.jpg/220px-Foudia_madagascariensis_-_W%C3%BCstenhaus_6.jpg" alt="Fody" />

<!--more-->

<a href="https://github.com/Fody/Fody" target="_blank">Fody can be found at Github</a>. It has loads of modules and you can create your own modules.

There are some particularly interesting modules such as:

<a href="https://github.com/Fody/PropertyChanged" target="_blank">PropertyChanged</a>

Rather than doing this:

[code language="csharp"]
public class Foo : INotifyPropertyChanged
{
    private string name;
    public string Name
    {
        get { return name; }
        set
        {
            if (name != value)
            {
                name = value;
                NotifyPropertyChange();
            }
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;

    public void NotifyPropertyChange([CallerMemberName] string propertyName = null)
    {
        if (PropertyChanged != null)
        {
            PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
[/code]

You can simply build it with this:

[code language="csharp"]
[PropertyChanged.ImplementPropertyChanged]
public class Foo
{
    public string Name { get; set; }
}
[/code]

There is also:
<a href="https://github.com/Fody/Anotar" target="_blank">Anotar</a> which makes loggin easier.
<a href="https://github.com/Fody/MethodTimer" target="_blank">MethodTimer</a> which makes method performance tracking easier.

Among others.
