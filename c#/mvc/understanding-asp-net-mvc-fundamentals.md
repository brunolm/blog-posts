---
title: "Understanding ASP.NET MVC fundamentals"
tags: [asp.net-mvc, c#, razor]
---

In a standard ASP.NET project with MVC you have a basic structure which is the separation of the Models / Views / Controllers.

In the <code>Views</code> folder you have two key files, the <code>_ViewStart.cshtml</code> special file which is where the views start up. By default it defines the shared layout all the views are going to use, which leads us to the second key file <code>Shared\_Layout.cshtml</code>. This file is the base site layout (if you know Web Forms you can think of it as a Master Page). Your views are going to be rendered inside this base view where it calls <code>@RenderBody()</code> which is going to render your view.
<!--more-->

Each view can have one model, it means each view can have an instance of an object that should be bound. By default the type of the model is <code>dynamic</code>, but you can specify the type on each view so you get some benefits such as intellisense.

[code language="csharp"]
@model Mynamespace.Models.MyClass
[/code]

Having a typed model also allows you to build a form with validations and allows you to post the model back to the server. This is where we start talking about Controllers.

Controllers are classes that knows what data should go where. For example:

[code language="csharp"]
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }
}
[/code]

All controllers should be named as the name followed by <code>Controller</code> suffix as MVC uses this as a convention.

In my <code>HomeController</code> I have a method called Index returning <code>ActionResult</code>. This means that when I access the method index it is going to return a view called index for me, because by default the view name is the same as the method name.

So I have:

[code]
Controllers
|- HomeController
Views
|- Home
 |- Index.cshtml
|- Shared
 |- _Layout.cshtml
_ViewStart.cshtml
[/code]

So access the controller Home and run the Index method you must go into the route to it. The routes are configured on the <code>RouteConfig.cs</code> file under <code>App_Start</code> by default.

[code language="csharp"]
public class RouteConfig
{
    public static void RegisterRoutes(RouteCollection routes)
    {
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

        routes.MapRoute(
            name: "Default",
            url: "{controller}/{action}/{id}",
            defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
        );
    }
}
[/code]

This is the standard route. It means that you will always be accessing a <code>controller/action/id</code>, in other words if you access <code>/home/index</code> you are going to execute the method <code>Index</code> of the <code>Home</code> controller. Note that there are default values to the parameters, this means that the default controller and action are Home and Index, so accessing the root of the website is the same as <code>/home/index</code>.

Running Index will return the view under <code>Views\Home\Index.cshtml</code>. If we had a method <code>About</code> we could access it as <code>/Home/About</code> and it would return the view under <code>Views\Home\About.cshtml</code>.

We can send models to our views. If we change the <code>Index</code> method to return a view with an object, for example:

[code language="csharp"]
return View(new Game());
[/code]

We could add on our view:

[code]
@model Example.Game
[/code]

Imagine now that we want to change the game name and submit back to the server, for that we can use <a href="https://msdn.microsoft.com/en-us/library/system.web.mvc.htmlhelper%28v=vs.118%29.aspx" target="_blank">HtmlHelper methods</a>.

[code language="csharp"]
@using (Html.BeginForm())
{
    <div>
        @Html.LabelFor(o => o.Name)
        @Html.TextBoxFor(o => o.Name)

        <input type="submit" value="Save game" />
    </div>
}
[/code]

The above would generate a label with a textbox next to it and a "Save game" button. As is the form is going to submit itself to the same action we are currently running. In this case the <code>Index</code> method on <code>HomeController</code>.

To be able to work with the submitted data we can annotate our controller methods (called actions) with verbose attributes.

[code language="csharp"]
public ActionResult Index()
{
    return View(new Game());
}

[HttpPost]
public ActionResult Index(Game game)
{
    return View(game);
}
[/code]

Now I have to actions with the same name, however in the second one I am saying that it is going to run only when the action verb is "POST". So when I post my form it will trigger this action. Also notice that I am receiving a parameter, which is the model I am submitting. The default model binder will catch the posted names and populate the object properties in the matching names. It means all the form values I was editing have now been submitted to the server and is available to me.

If you are using data annotations on your models you can know if the posted object is valid or not by accessing <code>ModelState.IsValid</code> which is available on the controllers.

I think this cover the very basics on ASP.NET MVC and allow you to start messing around with it by creating views, controllers, models and playing with HtmlHelper.
