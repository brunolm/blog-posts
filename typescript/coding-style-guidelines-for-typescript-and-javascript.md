---
title: Coding Style Guidelines for TypeScript and JavaScript
tags: [javascript, style, typescript]
---

For the latest version always check [brunolm/Docs/blob/master/code/js-ts/style.md](https://github.com/brunolm/Docs/blob/master/code/js-ts/style.md).

The style and guides used here is how I code. Different people/companies might use different styles.

<!--more-->

# Coding Style

- Always keep a space before and after (except if it would cause a trailing space):
  - `{` and `}`
  - Attribution
  - Conditional operators
- Always use `;` except on conditions, loops, `function`

```javascript
if (condition) { // OK! Right!
if (x > y) // OK! Right!
const a = b; // OK! Right!

// --

if(condition){ // WRONG!
if (x>y) // WRONG!
const a=b; // WRONG!
const a = b // WRONG!
```

## Variables

- Short objects can be declared in a single line, in this case don't use trailing comma
- If the object has too many properties then use multiple lines, always with a trailing comma

```javascript
const size = { width: 10, height: 20 };
const size = {
  width: 10,
  height: 20,
};
```

- Strings should use `'`
- Exceptions are template strings and HTML in React (which should be `"`)

```javascript
const text = 'Single quotes';
const textComposed = `Back-tick quotes ${size.width}x${size.height}`;
```

```
render() {
  return (
    <div>
      Hello World
    </div>
  );
}
```

## Conditional

### IF

- Brackets and new line are **always** required

```javascript
if (condition) {
  // code
}

if (!condition) {
  return;
}

if (err) {
  throw new Error('Something went wrong');
}
```

- When there are too many conditions make it clear what the composed condition mean. If it is going to be used in multiple places extract to a function and use `if (canContinue())`
- When breaking the condition in multiple lines, always keep the operator at the beginning of the line

```javascript
if (canDrag && canMove) {
  // code
}

const canContinue = canDrag
  && canMove
  && canEditSizes
  && this.state.visible;
if (canContinue) {
  // code
}
```

- `if` / `else if` / `else` should use a new line

```javascript
if (condition) {
  // code
}
else if (condition2) {
  // code
}
else {
  // code
}
```

### Switch

```javascript
switch (action.type) {
  case types.Init:
    init(state, action);
    break;

  case types.Clear: {
    clear(state, action);
    break;
  }

  default:
    return;
}
```

### Ternary

- For short conditions you can use the same line
- When the condition and/or results are too long break into multiple lines
- `?` and `:` should be in front of the line

```javascript
const value = condition ? 1 : 2;
const value = condition
  ? getValueFromService(this.paramX, this.paramY)
  : undefined;
```

## Loops

- Always keep a space after the loop keyword

```javascript
for (let i = 0; i < 10; ++i) {
}

while (condition) {
}

do {
} while (condition);
```

## Functions

- Function name and `()` should be together
- Add a space after closing `()`
- Add a space after comma in arguments
- Opening bracket in the same line
- Anonymous functions should have a space between `function` and `(`
- No semicolon after the function block

```javascript
function foo() {
}

function foo(width, height, area) {
}

function (x, y) {
}
```

- Arrow functions should always use `()`, even for a single parameter
- Add a semicolon after the code block

```javascript
const handleClick = (event) => {
};

const clear = (text1, search) => {
};
```

## Export

```javascript
export default function fn() {
}

export const types = {
};

export function foo() {

}
```

```javascript
export default class MultiSelect extends React.Component {
}
```

## Import

- Use correct syntax for each exported code

```javascript
import { types } from './types'; // export const types = { }
import fn from './fn'; // export default fn() { }
import * as fns from './fn'; // fns.default, fns.types, fns.foo
```

--

```javascript
import './index.scss';
import 'jquery';
import 'bootstrap';

import * as $ from 'jquery';
import * as React from 'react';

import { connect } from 'react-redux';

import parseUri from 'uri-sharp';
```

## React

- When opening `{` always use a new line for the code
- In a loop the parameter (HTML) passed in should end with a trailing comma
- Always insert space after opening and before closing jsx expression braces
- VSCode settings:

```javascript
"javascript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true
"typescript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true
```

React:

```javascript
render() {
  return (
    <div>
      {
        this.props.list.map(item =>
          <div>
            text
            { this.props.shouldShow &&
              <div>Only if shouldShow is true this will be visible</div>
            }
          </div>,
        )
      }
    </div>
  );
}
```


- Example with inline code
  - Ternary operator
  - Events

```javascript
onClick = (event) => {
  this.setState({
    clicked: true,
  });
}

render() {
  return (
    <select onClick={ this.onClick }>
      <option value="">{ this.props.loading ? 'Loading...' : 'Select organization...' }</option>
    </select>
  );
}
```

