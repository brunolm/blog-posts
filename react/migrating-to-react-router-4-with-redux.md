---
title: Migrating to React Router 4 with Redux
tags: [react, react-redux, react-router, react-router-redux]
---

`react-router` v4 requires you to do more stuff to add a proper route.

You will need to install:

```javascript
npm i -S history react-router react-router-redux
```

`browserHistory` is no longer available, to create a `history` object you need:

```javascript
import { createBrowserHistory } from 'history';
// then call createBrowserHistory()
```
<!--more-->


To integrate with redux you need to add one extra reducer to your combined reducers:

```javascript
import { routerReducer as routing } from 'react-router-redux';
// ...

const App = combineReducers({
  app,
  about,
  routing, // new
});

export default App;
```

After creating a store, you can finally create the history object:

```javascript
import { syncHistoryWithStore } from 'react-router-redux';
const history =
  syncHistoryWithStore(createBrowserHistory() as any, store);
```

And use it

```javascript
  <Router history={ history } children={ Routes } />
```

A [commit doing it can be seen here](https://github.com/brunolm/ts-react-redux-startup/commit/6965a960826b0b2a65c440d492203559f2f48b5e), but here are more things in this commit as well.

## Troubleshoot

### The prop `history` is marked as required in `Router`, but its value is `undefined`.

- `browserHistory` is no longer available in `react-router`, see post to use `history` package instead.

### react router 4 Cannot read property 'listen' of undefined

- You tried to create a history object with some documentation/tutorial you found, but you should do as this post says instead.
