---
title: "Blazor: Running C# in Frontend (cross-browser)"
tags: [c#, frontend, web]
---

Blazor is a framework that allows you to code C# for frontend. [Github page](https://github.com/SteveSanderson/Blazor).

> An experimental web UI framework using C#/Razor and HTML, running client-side via WebAssembly
>
> The arrival of WebAssembly creates the possibility of building client-side web applications using languages and runtimes that are more typically used for native app development. Blazor runs .NET code in the browser via a small, portable .NET runtime called DotNetAnywhere (DNA) compiled to WebAssembly.
>
> The programming model will be familiar to anyone who's worked with Razor (the C#/HTML page format used by ASP.NET MVC and ASP.NET Pages).

Blazor makes your app compact and much faster since it is compiled into code the browser doesn't have to parse.

It can run on older browsers (ex IE11) because it has polyfills.

The only note here is that it is very early. I mean, it is so early it can't even be called alpha or anything. It is just an experiment at the moment. (*Post written at 2017-08-12*)

<!--more-->

The prerequisite is **.NET Core 2.0 preview 3** or later. [Download SDK build 6764](https://dotnetcli.azureedge.net/dotnet/Sdk/2.0.0-preview3-006764/dotnet-sdk-2.0.0-preview3-006764-win-x64.exe).

Basically from what I've tested you create `.cshtml` files and those are going to be your routes. It means if you create a file `heroes.cshtml` you can go and type `/heroes` in the url and this file will load.

## Functions

You can define a functions section in your cshtml file where it will contain your C# code.

```csharp
@functions {
    int currentCount;

    void IncrementCount()
    {
        currentCount++;
    }
}
```

## Binding

You can bind click events like this

```csharp
<button @onclick(IncrementCount)>Increment</button>
```

And for async click:

```csharp
<button @onclickAsync(Model.OnSaveClick)>Save</button>
```

You can bind variables to inputs

```csharp
<input @bind(Model.Name) class="form-control" />
```

## Variables

You can display a variable value the same way you do in Razor, ex:

```csharp
<p>Current count: <strong>@currentCount</strong></p>
```

You can use conditions and other thinks just like Razor.

## Model

You can have a `.cshtml` and `.cs` file (which means you don't need the `@functions` section)

- [EditSession.cshtml](https://github.com/aspnet/Blazor-Hackathon/blob/master/samples/ConferencePlanner/ConferencePlanner.FrontEnd/EditSession.cshtml)
- [EditSession.cshtml.cs](https://github.com/aspnet/Blazor-Hackathon/blob/master/samples/ConferencePlanner/ConferencePlanner.FrontEnd/EditSession.cshtml.cs)

## Examples

- [Bootstrapped app from Blazor extension for VS](https://github.com/brunolm/BlazorApplication1)
- [Examples from a Hackaton](https://github.com/aspnet/Blazor-Hackathon/tree/master/samples/ClientServerApp)
- [Example of a "Full App" from a Hackaton](https://github.com/aspnet/Blazor-Hackathon/tree/master/samples/ConferencePlanner)

## Videos/Podcasts/Posts

- [Some coding in a conference](https://youtu.be/MiLAE6HMr10?t=35m54s)
- [Scott Hanselman podcast with David Bryant](https://hanselminutes.com/581/inside-webassembly-with-mozilla-fellow-david-bryant)
- [Scott Hanselman post about Blazor in his blog](https://www.hanselman.com/blog/NETAndWebAssemblyIsThisTheFutureOfTheFrontend.aspx)
