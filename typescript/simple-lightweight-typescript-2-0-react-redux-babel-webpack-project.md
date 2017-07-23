---
title: Simple lightweight TypeScript 2.0 React Redux Babel Webpack project
tags: [babel, flux, react, redux, typescript, webpack]
---

I'm never satisfied with bootstraps out there, so I'm always creating some simple ones. Well this one is a bit more complex than the other ones I've built because of the complexity of React and Redux.

Check it out at <a href="https://github.com/brunolm/ts-react-redux-startup">brunolm/ts-react-redux-startup</a>

I recently started using Workflowy (it is free), which is a website where you can create lists and it allows you to use as a brain dump. If you want to check it out you can use this link to get extra items <a href="https://goo.gl/JjpmOK">https://workflowy.com/invite/35df8d82.lnx</a>

On <a href="https://workflowy.com/s/5Ppxs0k72u">my Knowledge List</a> I added things about Redux, Babel, Webpack and everything else...

<!--more-->

This is how I did it:

Installation
<ul>
 	<li>npm i -S vash
<ul>
 	<li>Template engine. You could just send html file instead.</li>
</ul>
</li>
 	<li>npm i -S serve-favicon</li>
 	<li>npm i -S redux-thunk
<ul>
 	<li>Used to allow async actions</li>
</ul>
</li>
 	<li>npm i -S redux</li>
 	<li>npm i -S react-router</li>
 	<li>npm i -S react-redux</li>
 	<li>npm i -S react-dom</li>
 	<li>npm i -S react</li>
 	<li>npm i -S jquery</li>
 	<li>npm i -S history</li>
 	<li>npm i -S express</li>
 	<li>npm i -S compression
<ul>
 	<li>Optimize server</li>
</ul>
</li>
 	<li>npm i -S clone
<ul>
 	<li>Like Object.assign but does a deep copy</li>
</ul>
</li>
 	<li>npm i -D @types/chai</li>
 	<li>npm i -D @types/clone</li>
 	<li>npm i -D @types/express</li>
 	<li>npm i -D @types/history</li>
 	<li>npm i -D @types/jquery</li>
 	<li>npm i -D @types/mocha</li>
 	<li>npm i -D @types/node</li>
 	<li>npm i -D @types/react</li>
 	<li>npm i -D @types/react-dom</li>
 	<li>npm i -D @types/react-redux</li>
 	<li>npm i -D @types/react-router</li>
 	<li>npm i -D @types/redux</li>
 	<li>npm i -D @types/redux-thunk</li>
 	<li>npm i -D @types/webpack</li>
 	<li>npm i -D autoprefixer
<ul>
 	<li>Add browser prefix on css</li>
</ul>
</li>
 	<li>npm i -D babel</li>
 	<li>npm i -D babel-core</li>
 	<li>npm i -D babel-loader</li>
 	<li>npm i -D babel-polyfill</li>
 	<li>npm i -D babel-preset-es2015</li>
 	<li>npm i -D babel-preset-stage-0</li>
 	<li>npm i -D chai</li>
 	<li>npm i -D css-loader</li>
 	<li>npm i -D extract-text-webpack-plugin@2.0.0-beta.3
<ul>
 	<li>Used to generate a CSS file from imports instead of a JS</li>
</ul>
</li>
 	<li>npm i -D file-loader</li>
 	<li>npm i -D mocha</li>
 	<li>npm i -D postcss-loader</li>
 	<li>npm i -D precss
<ul>
 	<li>Allows the use o SASS like styles without SASS</li>
</ul>
</li>
 	<li>npm i -D rimraf</li>
 	<li>npm i -D style-loader</li>
 	<li>npm i -D supervisor</li>
 	<li>npm i -D ts-loader</li>
 	<li>npm i -D typescript@beta</li>
 	<li>npm i -D webpack@beta</li>
</ul>
Project configuration and flow
<ul>
 	<li><b>tsconfig.json </b>-<b> </b>TypeScript configuration
<ul>
 	<li>"target": "es6"
<ul>
 	<li>Allows the use of async/await</li>
</ul>
</li>
 	<li>"jsx": "react"
<ul>
 	<li>Compiles tsx files into plain JavaScript</li>
</ul>
</li>
 	<li>"skipLibCheck": true
<ul>
 	<li>Ignore errors from definitions, since it is still in beta there are a few issues</li>
</ul>
</li>
</ul>
</li>
 	<li><strong>.babelrc</strong> - Babel configuration
<ul>
 	<li>{ "presets": [ "es2015", "stage-0" ] }
<ul>
 	<li>Allows everything</li>
</ul>
</li>
</ul>
</li>
 	<li><strong>webpack.config.js </strong>- Webpack configuration
<ul>
 	<li>context
<ul>
 	<li>Defines root path context for webpack, probably always set it to __dirname (defaults to process.cwd())</li>
</ul>
</li>
 	<li>entry
<ul>
 	<li>app
<ul>
 	<li>Where to start building files, grabs index and follow requires</li>
</ul>
</li>
</ul>
</li>
 	<li>output
<ul>
 	<li>path
<ul>
 	<li>Output folder location</li>
</ul>
</li>
 	<li>publicPath
<ul>
 	<li>Application route to static files</li>
</ul>
</li>
 	<li>filename
<ul>
 	<li>Output filename
<ul>
 	<li>[name] - entry name</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
 	<li>resolve
<ul>
 	<li>extensions
<ul>
 	<li>Apply loaders on defined extensions</li>
 	<li>"Empty" extension ('') allows parsing of files without extensions</li>
</ul>
</li>
</ul>
</li>
 	<li>postcss
<ul>
 	<li>Callback function for postcss-loader</li>
 	<li>precss
<ul>
 	<li>Parse SASS like styles</li>
</ul>
</li>
 	<li>autoprefixer
<ul>
 	<li>Add prefix on browser specific styles</li>
</ul>
</li>
</ul>
</li>
 	<li>module
<ul>
 	<li>loaders
<ul>
 	<li>{ test: /\.tsx?$/, loader: 'babel!ts', include: /src|spec/, }
<ul>
 	<li>Builds ts and tsx from src and spec folder using ts-loader then babel-loader</li>
</ul>
</li>
 	<li>{ test: /\.s?css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css!postcss' }), include: /src/, }
<ul>
 	<li>Builds css from src folder using postcss, precss, autoprefixer, css, style</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
 	<li>plugins
<ul>
 	<li>new ExtractTextPlugin({ filename: 'app.css', disable: false, allChunks: true })
<ul>
 	<li>Extract contents and add to file, useful to generate css files</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
 	<li><strong>app.js</strong> - App configuration
<ul>
 	<li>app.use(compression())
<ul>
 	<li>Enable gzip from server making requests smaller</li>
 	<li><strong>Note</strong>: If you are using webpack-dev-middleware and/or webpack-hot-middleware register these before compression, or it will interfere</li>
</ul>
</li>
 	<li>app.use(favicon(path))
<ul>
 	<li>Setup favicon</li>
</ul>
</li>
 	<li>app.use('/static', express.static(path))
<ul>
 	<li>Makes routes to /static render static content from folder path</li>
</ul>
</li>
 	<li>app.set('view engine', 'vash')
<ul>
 	<li>Setup express to require('vash') when rendering views</li>
</ul>
</li>
 	<li>app.set('views', path)
<ul>
 	<li>Setup root folder of views</li>
</ul>
</li>
 	<li>app.engine('cshtml', vash.renderFile)
<ul>
 	<li>Add support to cshtml to be rendered as vash views. This leverages VSCode razor editor</li>
</ul>
</li>
</ul>
</li>
 	<li><strong>index.js</strong> - Server startup
<ul>
 	<li>app.use('/api', require('./src/api'))
<ul>
 	<li>Uses express.Router to create routes under '/api'</li>
</ul>
</li>
 	<li>app.use((req, res) =&gt; ...)
<ul>
 	<li>Catch-all route which will render index.cshtml view</li>
</ul>
</li>
 	<li>app.listen(...)
<ul>
 	<li>Starts the server</li>
</ul>
</li>
</ul>
</li>
 	<li><strong>src/index.tsx</strong> - Redux starting point
<ul>
 	<li>createStore(reducers, applyMiddleware(thunk))
<ul>
 	<li>Create a single application store using all reducers
<ul>
 	<li>State becomes: state.app, state.about...</li>
</ul>
</li>
 	<li>thunk allows async actions</li>
</ul>
</li>
 	<li>&lt;Provider store={ store }&gt;
<ul>
 	<li>Setup redux store</li>
 	<li>&lt;Router history={ browserHistory } children={ Routes } /&gt;
<ul>
 	<li>Setup routes</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
 	<li><strong>src/routes.tsx</strong> - Setup routes
<ul>
 	<li>&lt;Router&gt;
<ul>
 	<li>&lt;Route path="/" component={ App } /&gt;
<ul>
 	<li>Accessing '/' on the browser will render the App <em>container</em></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
 	<li><strong>src/components/app/index.tsx</strong> - Redux container
<ul>
 	<li>class App extends React&lt;any, any&gt;
<ul>
 	<li>Creates a react component</li>
</ul>
</li>
 	<li>connect(mapStateToProps)
<ul>
 	<li>Converts state returned by the reducer into props for the component
<ul>
 	<li>Uses static propTypes to inject properties</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
 	<li><strong>src/actions/about.ts</strong> - export functions that a component can request
<ul>
 	<li>mirror
<ul>
 	<li>A helper function I created to make object value equal to its key, with a prefix (namespace) to differentiate actions since the entire application goes through the same dispatcher</li>
</ul>
</li>
 	<li>changeText()
<ul>
 	<li>Makes an ajax request and calls dispatch on the callback</li>
 	<li><strong>Note</strong>: This is only possible because o thunk middleware, otherwise you have to return a plain object</li>
</ul>
</li>
</ul>
</li>
 	<li><strong>src/reducers/about.ts</strong> - State for about container
<ul>
 	<li>Export a default function that handle actions when something is dispatched</li>
 	<li>Should return a new object
<ul>
 	<li>Don't reassign the state, make a copy. Unless it falls on default which means "the dispatched action has nothing to do with this reducer so return the same state for it"</li>
 	<li>Keep in mind
<ul>
 	<li>Object.assign does not do a deep copy, that's why I included clone</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
