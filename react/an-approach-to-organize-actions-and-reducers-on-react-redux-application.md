---
title: "An approach to organize actions and reducers on react-redux application"
tags: [react, redux, software-architecture, typescript]
---

In redux there are actions and reducers.

An action executes some code and sends data to a reducer to update the application state. The application tends to get a bit messy the more actions and reducers you have.

To solve this problem I created this architecture
<!--more-->

## Architecture

<pre>
src/actions
├── about
│   ├── base-action.ts     # defines a namespace for all actions in this folder
│   ├── change-text.ts     # exports a single function that returns action data
│   ├── index.ts           # group all actions and action types from this folder
│   └── init.ts            # exports a single function that returns action data
└── home
    ├── base-action.ts     # defines a namespace for all actions in this folder
    ├── index.ts           # group all actions and action types from this folder
    └── init.ts            # exports a single function that returns action data
</pre>

<pre>
src/reducers
├── about
│   ├── base-reducer.ts    # export the initial state for this reducer
│   ├── get-data.ts        # exports a single function that returns a new state
│   ├── index.ts           # groups reducers from this folder in a `key: value` map
│   └── init.ts            # exports a single function that returns a new state
├── base-reducer.ts        # export TypeScript interfaces
├── home
│   ├── base-reducer.ts    # export theinitial state for this reducer
│   ├── index.ts           # groups reducers from this folder in a `key: value` map
│   └── init.ts            # exports a single function that returns a new state
└── index.ts
</pre>

## Adding a new action

Create a new file on `actions/home`, ex: `init.ts`.

```javascript
// Get the namespace from base-action
// export const action = { namespace: 'Home' };
import { action } from './base-action';

export const types = {
  Init: 'Init',
};

export function init() {
  // return this and any data you want to add
  return { ...action, type: types.Init };
}
```

Update `actions/home/index.ts`

```javascript
// action for previous file
export { init } from './init';

// action types from previous file
import { types as initTypes } from './init';

// group all action types in a single object
export const types = {
  ...initTypes,
};
```

After that you are done creating an action.

## Adding a new reducer

Create a new file on `reducers/home`, ex: `init.ts`.

```javascript
export default function init(state) {
  return {
    ...state,  // and any other state you want to add
  };
}
```

Update `reducers/home/base-reducer.ts` if you add any new properties on the state so the initial state stays correct.

```javascript
export const InitialState = {
  title: '',
  newProp: '',
};
```

Update `reducers/home/index.ts`

```javascript
import { InitialState } from './base-reducer';

import { default as init } from './init';

import { types } from '../../actions/home';

// This is a map between action types and reducers,
// so when an action happens it decides which
// reducer to call, so a huge switch is not needed
const reducer = {
  [types.Init]: init,
} as { [key: string]: (state: typeof InitialState, action: Action) =&gt; any; };

// the reducer
export const home = (state = InitialState, action) =&gt; {
  // in this example we want to run actions from home
  // so if the action type is `Init` but it is
  // from `Contact` page then it will not run here
  if (action.namespace !== 'Home') {
    return state;
  }

  // it looks up in the map to see if there are
  // reducers for the given type, if not then
  // returns the previous state
  return reducer[action.type]
    ? reducer[action.type](state, action)
    : state;
};
```

## Examples

- [TS React Redux Startup - Basic startup architecture](https://github.com/brunolm/ts-react-redux-startup/tree/v1.4.0/src)
- [Trellal - Real world project](https://github.com/brunolm/trellal/tree/master/src)
