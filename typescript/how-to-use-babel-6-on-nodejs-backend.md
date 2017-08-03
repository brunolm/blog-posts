---
title: "How to use Babel 6 on NodeJS backend"
tags: [babel, node.js]
---

<a href="https://babeljs.io/" target="_blank">Babel</a> supports future versions of Javascript and compile it to currently supported versions of Javascript. Very similar to <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>.

To use Babel 6 on your project:
<!--more-->

```
npm install babel-core --save-dev
npm install babel-preset-es2015 --save-dev
```

And then on your start file:

```
require("babel-core/register");
```

From this line all further requires are going to be compiled with Babel.

You also need to tell Babel what preset to use. On the root create a file `.babelrc` and configure like this:

```
{
    presets: [ "es2015" ]
}
```

Done. Now you can use es6 on your modules.
