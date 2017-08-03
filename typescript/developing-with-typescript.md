---
title: "Developing with TypeScript"
tags: [javascript, typescript]
---

<a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a> is a programming language that is compiled to Javascript. It works on anything, so you can use it on any project.
<blockquote>TypeScript lets you write JavaScript the way you really want to.
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
Any browser. Any host. Any OS. Open Source.</blockquote>
<!--more-->

TypeScript is built in TypeScript which compiles to Javascript code that compiles TypeScript to Javascript.

<img class="alignnone" src="http://images4.fanpop.com/image/photos/17900000/Leonardo-DiCaprio-as-Dom-Cobb-in-Inception-leonardo-dicaprio-17976642-1364-768.jpg" alt="" width="689" height="388" />

TypeScript brings lots of advantages. With the typed system it is impossible to make mistakes sending wrong types. By being a typed language it allows IDEs to add powerful auto-completion, reference finding, refactoring mechanisms.

In TypeScript you can easily define interfaces, classes, enums, namespaces... You can use types, generics...

```
class Foo
{
    Bar<T>(something: T): T
    {
        return something;
    }
}

interface IEntity
{
    Name: string;
}

var foo = new Foo();

var e: IEntity;
var n: number = 0;

n = foo.Bar(10);
e = foo.Bar({ Name: "Bruno Michels" });

alert(n);
alert(e.Name);
```

Generates:

```
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.Bar = function (something) {
        return something;
    };
    return Foo;
})();
var foo = new Foo();
var e;
var n = 0;
n = foo.Bar(10);
e = foo.Bar({ Name: "Bruno Michels" });
alert(n);
alert(e.Name);
```

For more check the links at the end of the post.

<h3>Who uses TypeScript today?</h3>

<ul>
<li>Azure</li>
<li>XBox Music (over half million lines of code)</li>
<li>Bing</li>
<li>Adobe</li>
<li>Starling JS</li>
<li>turbulenz</li>
<li>HeliosJS</li>
<li>zud.io</li>
</ul>

TypeScript was introduced late on XBox Music development. They already had a large code base. So you can too, it is never too late to start using TypeScript.

And the newest one, <a href="http://blogs.msdn.com/b/typescript/archive/2015/03/05/angular-2-0-built-on-typescript.aspx" target="_blank">Angular2 is going to use TypeScript</a>.

<h2>See also</h2>

<a href="http://www.typescriptlang.org/Playground/#tut=ex5" target="_blank">TypeScript Playground</a>
<a href="http://www.typescriptlang.org/Samples" target="_blank">TypeScript Samples</a>
<a href="http://www.typescriptlang.org/Content/TypeScript%20Language%20Specification.pdf" target="_blank">TypeScript Specification</a>
<a href="https://github.com/Microsoft/TypeScript" target="_blank">TypeScript source code</a>
