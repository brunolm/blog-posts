---
title: "NodeJS architecture based on ASP.NET MVC"
tags: [asp.net-mvc, node.js, typescript]
---

The <a href="https://github.com/brunolm/NodeExpress4" target="_blank">project for this post can be found at my GitHub</a>. I'm using the following packages:
<ul>
	<li><strong><a href="http://expressjs.com/starter/hello-world.html" target="_blank">express</a></strong>: helps you setup your application to handle requests.</li>
	<li><strong><a href="https://github.com/ericf/express-handlebars" target="_blank">express-handlebars</a></strong>: this allows you to send data from the server to your views, you can think of it as the <strong>razor</strong> for node.</li>
</ul>
.NET MVC works by making requests map to controllers and actions. The same can be achieved in node.
<!--more-->

We start by creating a file called <strong>app.js </strong>it is going to contain the setup for our application. One piece of it is the configuration for the routes.

To configure a route all you need to do is point it to a method that receives a request and a response. On a simple example:

<em>home.js</em>
```
function index(req, res) { }
module.exports = index;
```

Notice that at the end we have a `module.exports = index;`. It means that our file is exporting this function, so on another file if we require it then it is going to be available for us.

In this case we want to register a route on our app.js, to do that we would then do this (I'm skipping express details, but if you need more information check <a href="http://expressjs.com/starter/hello-world.html" target="_blank">their documentation</a>):

<em>app.js</em>
```
var home = require("./home");

app.use("/", home.index); // index is available here
                          // because we exported it
```

So far we have basically written a controller. So now lets move to the views.

Express-Handlebars requires that your files stay on a folder called views. And if you want to use a default layout you can place it inside a folder called layouts. Our views will have the extension .hbs. So our file structure will look like this:

```
views
|- layouts
   |- layout.hbs
|- home
   |- index.hbs
```

To render a view we are going to edit our controller to `return View();`.

```
function index(req, res) {
    res.render("home/index", { title: "this is the view model" });
}
```

This is going to parse the index.hbs file inside the views\home directory and output on the client. Now lets see how the view code looks like:

The layout contains the tag `{{{body}}}` which is a placeholder for the view code that will use this layout.

<em>layout.hbs</em>
```html
<html>
<head>
    <title>{{title}} | NodeJS + Express + Handlebars</title>
</head>
<body>
    {{{body}}}
</body>
</html>
```

And then we have the view itself that is just the content that will be rendered on the layout body tag.

<em>index.hbs</em>
```html
Hello world! {{title}}
```

As you've probably noticed, the syntax `{{var}}` transforms a variable into a string. On our controller we passed the model with a title, so we can use `{{title}}` to display the value of that property.

And this is the basic part of it.

With TypeScript we can create controllers that will look a lot like .NET MVC controllers. For example, our home controller can be defined as:

```
import vm = require("../viewmodels/home/IndexViewModel");

class HomeController {

    // GET /
    Index(req: express.Request, res: express.Response) {
        res.render("home/index", new vm.IndexViewModel());
    }
}

export = new HomeController();
```

And then on our app.js we can register it as:

```
var homeController = require("./controllers/HomeController");
app.use("/", homeController.Index);
```

The models can be created as classes:

```
export class IndexViewModel {
    public title: string = "Home";
}
```

Cool! "But now I have 10 controllers and tons of routes, my app.js looks terrible!"

Don't worry, there is a better way to configure it. You can delegate the mapping responsibility to your controllers.

<em>app.js</em>
```
var routeConfig = require("./controllers");
routeConfig.Register(app);
```

Note that in the code above I'm using require on a folder, it means that it is going to try and retrieve the index.js file.

<em>controllers\Index.ts</em>
```
import express = require("express");

import homeController = require("./HomeController");
import userController = require("./UserController");

class RouteConfig {
    static Register(app: express.Application) {
        homeController.Register(app);
        userController.Register(app);
    }
}

export = RouteConfig;
```

<em>controllers\HomeController.ts</em>
```
class HomeController {

    // GET /
    Index(req: express.Request, res: express.Response) {
        res.render("home/index", new vm.IndexViewModel());
    }

    Register(app: express.Application) {
        app.use("/", this.Index);
    }
}

export = new HomeController();
```

This way the responsibility to map the routes are in each controller. A little different from the default routing from ASP.NET, but similar to attribute routing.

Now you have a cool MVC structure running on Node.js!
