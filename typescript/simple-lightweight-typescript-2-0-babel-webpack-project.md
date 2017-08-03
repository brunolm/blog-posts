---
title: "Simple lightweight TypeScript 2.0 Babel Webpack project"
tags: [babel, typescript, typescript2.0, webpack]
---

I wanted to create a project using TypeScript + Babel. I knew I would have to setup a few things.

I choose to use Webpack because it has some dev tools, auto-reload. And it is nice to use loaders. But I couldn’t find any minimal simple examples, so I decided to create one.

<a href="https://github.com/brunolm/typescript-babel-webpack">brunolm/typescript-babel-webpack</a> is a project with just the essential, nothing else. Simple and clean.

You can see that in this project there is a `README.md` where I tried to write all the steps I went through to create that setup and the issues I faced.

<!--more-->

I recently started using Workflowy (it is free), which is a website where you can create lists and it allows you to use as a brain dump. If you want to check it out you can use this link to get extra items <a href="https://workflowy.com/invite/35df8d82.lnx">https://workflowy.com/invite/35df8d82.lnx</a>

On <a href="https://workflowy.com/s/5Ppxs0k72u">my Knowledge List</a> I added things about Babel and Webpack.

<!-- more -->

And this is how I created it:

Installation
<ul>
 	<li>npm install -D @types/node
<ul>
 	<li>In TypeScript 2.0 we can install types from npm directly <a href="https://www.npmjs.com/~types">https://www.npmjs.com/~types</a></li>
</ul>
</li>
 	<li>npm install -D babel-core</li>
 	<li>npm install -D babel-loader
<ul>
 	<li>Required on Webpack</li>
</ul>
</li>
 	<li>npm install -D babel-polyfill
<ul>
 	<li>Allows async/await among other things</li>
</ul>
</li>
 	<li>npm install -D babel-preset-es2015</li>
 	<li>npm install -D babel-preset-stage-0</li>
 	<li>npm install -D rimraf
<ul>
 	<li>I use to clear the output folder</li>
</ul>
</li>
 	<li>npm install -D ts-loader
<ul>
 	<li>Required on Webpack</li>
</ul>
</li>
 	<li>npm install -D typescript@beta
<ul>
 	<li>Installs TypeScript 2.0-beta</li>
</ul>
</li>
 	<li>npm install -D webpack</li>
</ul>
To configure TypeScript I created a `tsconfig.json`
<ul>
 	<li>tsc -init
<ul>
 	<li>Changed "target" version to "es6"</li>
</ul>
</li>
</ul>
To configure Babel I create a `.babelrc` file
<ul>
 	<li>.babelrc
<ul>
 	<li> { "presets": ["es2015", "stage-0"] }</li>
</ul>
</li>
</ul>
These presets come from the installs above. With ES2015 and Stage-0 I am basically saying "include everything there is to include, I want to use it all". This allows Babel to work with any code you want to use. If you want to make things lighter you could look on Babel docs how those presets work and use only what you need.

Now on Webpack I created a file `webpack.config.js`

```js
module.exports = {
  entry: ['babel-polyfill', './src/'],
  output: {
    path: __dirname,
    filename: './dist/index.js',
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
  },
  module: {
    loaders: [{
      test: /\.ts$/, loaders: ['babel-loader', 'ts-loader'], exclude: /node_modules/
    }],
  }
};
```

<ul>
 	<li>entry
<ul>
 	<li>Filename</li>
 	<li>Array of files</li>
 	<li>Object with properties that are arrays and/or strings</li>
</ul>
</li>
 	<li>output
<ul>
 	<li>path
<ul>
<ul>
 	<li>Defines output directory</li>
</ul>
</ul>
</li>
 	<li>filename
<ul>
<ul>
 	<li>name of generated file</li>
 	<li>if entry is an object you can use `[name]` which gets the prop name to bundle in different files</li>
</ul>
</ul>
</li>
</ul>
</li>
 	<li>resolve
<ul>
 	<li>extensions
<ul>
<ul>
 	<li>Array of extensions to parse</li>
 	<li>`extensions: ['', '.js', '.ts'],`</li>
</ul>
</ul>
</li>
</ul>
</li>
 	<li>module
<ul>
 	<li>loaders
<ul>
 	<li>Array of objects
<ul>
 	<li>test
<ul>
 	<li>Regex to test file name (test extension .ts .js)</li>
</ul>
</li>
 	<li>loaders
<ul>
 	<li>Installed loaders to parse matched files</li>
 	<li>Run right to left</li>
 	<li>[ 'babel-loader', 'ts-loader' ]</li>
 	<li>'babel!ts'</li>
</ul>
</li>
 	<li>exclude
<ul>
 	<li>/node_modules/</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
I had only one issue during this setup, I was getting an error

```error TS2304: Cannot find name 'regeneratorRuntime'.```

. It was because I had my loaders in wrong order. The correct order is RIGHT to LEFT, so TypeScript should go last to run first. <a href="http://stackoverflow.com/a/38321269/340760" target="_blank">http://stackoverflow.com/a/38321269/340760 </a>

And this is how I configured it all.
