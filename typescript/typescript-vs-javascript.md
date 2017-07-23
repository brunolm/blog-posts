---
title: "TypeScript vs JavaScript"
tags: [javascript, typescript]
---

<a href="http://www.typescriptlang.org/" target="_blank"><strong>TypeScript</strong></a> is JavaScript with types, to put it simple.
<ul>
 	<li><strong>How do I install?</strong>
<ul>
 	<li>npm i -D typescript</li>
</ul>
</li>
 	<li><strong>Does it work on Linux/Mac?</strong>
<ul>
 	<li>Yes</li>
</ul>
</li>
 	<li><strong>Does my editor support it?</strong>
<ul>
 	<li>VSCode, Atom, Vim, Sublime... <a href="https://i.imgur.com/uA6oG6d.png" target="_blank">See more here</a></li>
</ul>
</li>
 	<li><strong>Do I have to learn a whole new language? Like CoffeeScript, Dart...?</strong>
<ul>
 	<li><strong>No! Absolutely no!</strong> If you know JavaScript you know 95%. The remaining 5% or less is basically configuration.</li>
</ul>
</li>
 	<li><strong>Any big companies using it?</strong>
<ul>
 	<li><strong>Microsoft, Google</strong>... and <a href="https://www.typescriptlang.org/community/friends.html" target="_blank">over 120 that you can check here</a>.</li>
</ul>
</li>
 	<li><strong>Does it support React?</strong>
<ul>
 	<li>Yes. `.tsx` files.</li>
</ul>
</li>
 	<li><strong>Have you ever coded a real project with it?</strong>
<ul>
 	<li>Yes and I actually kept it compatible with the architecture of other (js) projects in my company. One of the projects is scaling.</li>
</ul>
</li>
 	<li><strong>How many bugs did you prevent?</strong>
<ul>
 	<li>Over 9000... A lot and very recently I found a bug in production in a very big project that would never happen if it was coded in TypeScript.</li>
</ul>
</li>
 	<li><strong>Do you still use babel?</strong>
<ul>
 	<li>Not if I get to choose which version of node I will be using. For some old versions some polyfills are really good... TypeScript does not add polyfills, it does not change your code more than enough to support a few ES features. You can <a href="https://www.typescriptlang.org/play/index.html" target="_blank">check it out for yourself on TypeScript playground</a>, the playground targets ES3, so if you use arrow functions or async/await TypeScript will "alter" your code.</li>
</ul>
</li>
</ul>
<!--more-->
<h2>Basic usage</h2>
You can annotate your code with types to catch errors during "compile" time (development time if you use a IDE/extension with support to TS) rather than catching errors in production.

<img src="https://i.imgur.com/qxIou6C.png" alt="ts-js" />

But it is perfectly fine to not use the types, you will just end up with JavaScript.

<img src="https://i.imgur.com/MRULk2m.png" alt="ts-js" />
<h2>Real world bug found</h2>
This `add` example looks silly, but it is just a simple one. The following was a bug I found in real code in production (a bit simplified):

<img src="https://i.imgur.com/ibx1tOL.png" />

Doesn't look like there are any errors right? Lets add TypeScript to find issues:

<img src="https://i.imgur.com/XMwNT63.png" />

<strong>Oops! </strong>Looks like we found a bug! `fields` is an array of strings and there is a call to `renderGroup` that takes a object with a property `group`, but instead the code is being called with a string.

Cool huh? That would never make it to production if it was coded in TypeScript.

Lets see what else is there...
<h2>Latest syntax with no worries</h2>
TypeScript has a setting that allows you to target a specific ECMAScript version. If you set to `es5` then the arrow functions will be converted to functions. You can use the latest syntax features without having to worry about a thing.

Example spread operator on objects:

<img src="https://i.imgur.com/NAC1oH5.png" alt="ts-js" />
<h2>Intellisense!</h2>
<img src="https://i.imgur.com/TdLgrV3.png" alt="ts-js" />

From existing libraries as well (how many times did you forget some of the jQuery.ajax parameters huh? (I don't blame you there are so many); If you never forgot a single one then... well... can you remember all other methods from all other libraries all the time? I hope you can, but it is not as easy as this, is it?)

<img src="https://i.imgur.com/aAjCCl0.png" />

To install a type, like the example above, just do (TypeScript 2.0+): `npm i -D @types/jquery`
<h2>Refactor!</h2>
You get to refactor your code. Rename only the variable you want across files without changing comments or local vars or other object properties with the same name.

<img src="https://i.imgur.com/izPuNeQ.png" />
<h2>Real World applications/code made with TypeScript</h2>
<ul>
 	<li><a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a>
<ul>
 	<li><a href="https://marketplace.visualstudio.com/VSCode" target="_blank">Including extensions</a></li>
</ul>
</li>
 	<li><a href="https://github.com/angular/angular" target="_blank">Angular</a></li>
 	<li>Sample code: <a href="https://github.com/brunolm/ts-react-redux-startup" target="_blank">TypeScript + React + Redux bootstrap</a></li>
 	<li>See more on <a href="https://github.com/trending/typescript" target="_blank">Github trending for TypeScript</a></li>
</ul>
<h2>Some other posts about TypeScript</h2>
<ul>
 	<li><a href="http://www.hanselman.com/blog/WhyDoesTypeScriptHaveToBeTheAnswerToAnything.aspx" target="_blank">Why does TypeScript have to be the answer to anything?</a> - Scott Hanselman</li>
 	<li><a href="https://scotch.io/tutorials/why-you-shouldnt-be-scared-of-typescript" target="_blank">Why You Shouldn’t Be Scared of TypeScript</a> - Peleke Sengstacke</li>
</ul>
<h2>Links</h2>
<ul>
 	<li><strong>Site </strong><a href="https://www.typescriptlang.org/" target="_blank">https://www.typescriptlang.org/</a></li>
 	<li><strong>Git </strong><a href="https://github.com/Microsoft/TypeScript" target="_blank">https://github.com/Microsoft/TypeScript</a></li>
 	<li><strong>NPM </strong><a href="https://www.npmjs.com/package/typescript" target="_blank">https://www.npmjs.com/package/typescript</a></li>
 	<li><strong>Twitter</strong> <a href="https://twitter.com/typescriptlang" target="_blank">https://twitter.com/typescriptlang</a></li>
 	<li><strong>Wanna play a game?</strong>
<ul>
 	<li><strong><a href="https://www.codewars.com/kata/search/typescript?q=&amp;beta=false" target="_blank">CodeWars katas in TypeScript</a></strong></li>
 	<li><a href="http://www.typescriptlang.org/play/index.html" target="_blank">TypeScript playground</a></li>
</ul>
</li>
</ul>
If you want to learn it just <a href="http://www.typescriptlang.org/docs/handbook/basic-types.html" target="_blank">go to TypeScript handbook</a> and have a look at it. It is quite fast and quite simple.

<img src="https://i.imgur.com/Nw5GOZR.png" />
