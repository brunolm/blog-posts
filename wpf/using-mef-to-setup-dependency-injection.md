---
title: "Using MEF to setup Dependency Injection"
tags: [.net, c#, dependency-injection, ioc, mef]
---

Managed Extensibility Framework (MEF) is a built-in set of elements that allows you to "export" and "import" objects across projects which allows you not to rely on hard dependencies.

From Microsoft:
<blockquote>The Managed Extensibility Framework or MEF is a library for creating lightweight, extensible applications. It allows application developers to discover and use extensions with no configuration required. It also lets extension developers easily encapsulate code and avoid fragile hard dependencies. MEF not only allows extensions to be reused within applications, but across applications as well.</blockquote>
<!--more-->
To use MEF you have to include the following reference to your project:

```System.ComponentModel.Composition```

We need to define a container. This is where all exported values are going to be stored. One simple way to do that is to create a class such as this one:

```csharp
public static class Mef
{
    private static CompositionContainer container;

    public static CompositionContainer Container
    {
        get
        {
            if (container == null)
            {
                var catalog =
                    new DirectoryCatalog(".", "MyProjectNamespace.*");

                container = new CompositionContainer(catalog);
            }

            return container;
        }
    }
}
```

This is going to grab all exported values from all assemblies in the same directory starting with "MyProjectNamespace".

And then I can annotate the classes I want to export:

```csharp
[Export]
public class Logger
{
}

[Export]
public class GameService
{
    [Import]
    private Logger log;
}
```

Whenever I need a GameService I can request it from the container:

```csharp
GameService gameService = Mef.Container.GetExportedValue<GameService>();
```

Notice that on `GameService` class I have a field with an `[Import]` attribute. This means MEF is going to resolve the value for me while it is retrieving the exported value for `GameService`.

I can also export a class identified by an interface:

```csharp
[Export(typeof(IGameService))]
public class GameService
{
    [Import]
    private Logger log;
}
```

And I could use it as:

```csharp
GameService gameService = Mef.Container.GetExportedValue<IGameService>();
```

MEF is going to get whatever it has in its container for `IGameService`.

If you have more than one export for `IGameService` and you attempt to resolve it with `GetExportedValue` you are going to get an exception.

You can have multiple exports, but the way you have to handle it is different.

For example, I can have a screen with several tabs which are exported:

```csharp
public interface ITab { }

[Export(typeof(ITab))]
public class HomeTab : ITab { }

[Export(typeof(ITab))]
public class GamesTab : ITab { }

[Export(typeof(ITab))]
public class WishlistTab : ITab { }
```

And I can import them using the `ImportMany` attribute

```csharp
[Export]
public class Home
{
    [ImportMany]
    private List<ITab> tabs;
}
```

<a href="https://brunolm.files.wordpress.com/2015/03/2015-09-04-01-09-44-199.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-09-04-01-09-44-199.png" alt="2015-09-04 01-09-44-199" width="441" height="126" class="alignnone size-full wp-image-86" /></a>

And there is also the `ImportingConstructor` attribute which allows me to import objects while I am creating the instance.

```csharp
[Export]
public class GameService
{
    private Logger log;

    [ImportingConstructor]
    public GameService(Logger log)
    {
        this.log = log;
    }
}

[Export]
public class Logger { }
```

<a href="https://brunolm.files.wordpress.com/2015/03/2015-14-04-01-14-03-448.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-14-04-01-14-03-448.png" alt="2015-14-04 01-14-03-448" width="445" height="74" class="alignnone size-full wp-image-88" /></a>
