---
title: Using async/await in TypeScript / JavaScript
tags: [async/await, javascript, typescript]
---

`async` and `await` are keywords commonly used on C#. They allow you to perform async operations without the callback hell.

The "callback hell" happens when you perform multiple async operations. For each operation you need to send a callback, a function that will execute when the operation completes.

<a href="https://brunolm.files.wordpress.com/2017/01/hadouken-code.jpg"><img class="alignnone size-full wp-image-594" src="https://brunolm.files.wordpress.com/2017/01/hadouken-code.jpg" alt="hadouken-code" width="625" height="364" /></a>

<!--more-->

But finally `async` and `await` came to the rescue! It is on C# 4.0, ECMAScript 7 and also available on Python 3.5.

Those keywords allow you to flatten your code, but still run the operation asynchronously.

Something like this:

```js
(function () {
  fs.readFile('DATA', 'utf8', function (err, contents) {
    if (err) {
      return console.error(err);
    }
    callContentApi(contents, function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('Content saved');
    });
  });
}());
```

Can be written as:

```js
(async function () {
  try {
    const contents = await fs.readFile('DATA', 'utf8');
    await callContentApi(contents);
    console.log('Content saved');
  }
  catch (err) {
    console.error(err);
  }
}());
```

Now it is linear, it is easier to understand the flow of the application.

Using a `Promise` you can create a `wait` function. You can use the keyword `await` on functions that are `async` or that return a `new Promise`.

```js
function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}

(async function () {
  await wait(1000);
  console.log('After a second!');
}());
```

See

- [Async function on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

