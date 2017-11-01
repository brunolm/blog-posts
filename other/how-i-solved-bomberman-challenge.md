---
title: "How I solved Bomberman challenge on HackerRank"
tags: [javascript, typescript, algorithms]
---

I found a challenge called ["The Bomberman Game" on HackerRank](https://www.hackerrank.com/challenges/bomber-man/problem) and I found it pretty interesting.

It boils down to something like this:

## The Bomberman Game

### Rules

- Bombs will explode in 3 seconds
- When a bomb explodes it clears its tile and 1 tile up, down, left, right
- Bombs that are about to go off explode at the same time
- There are no chain reactions
- If a bomb explodes next to another that is not about to go off then the nearby bomb is just cleared

### Iteration

1. Bomberman plants some bombs (you're given an input with the map)
2. A second passes
3. A second passes. Bomberman plants bombs on all empty slots
4. A second passes
5. Repeat 3 and 4 until N seconds passes

### Input

- `R` = number of rows
- `C` = number of cols
- `S` = number of seconds
- `O` = bomb
- `.` = empty

```
R C S
O..
...
```

### Task

Return the map after N seconds have passed.

---

## Solving

The first thing I though was to solve it with a generator (well, there was no real need to use it, but since it is about a game I thought it would be fun to be able to access any state of the game).

<!--more-->

The challenge calls a function named `processData` passing the input. The `input` parameter is a string and within it there are data you need to extract, so the first thing I did was to create a function to parse the input. This way I'm [separating concerns](https://github.com/coding-wise/best-practices/blob/master/principles/SOLID.md) and avoiding the [GOD anti-pattern](https://github.com/coding-wise/best-practices/blob/master/anti-patterns/GOD.md).

> A little disclaimer before showing the code: I implemented it in a way that it's easier to implement, understand and is maintainable (not perfect, I could still improve it), I could improve the performance a lot by implementing without a matrix and doing some different things. But in any case it did pass all performance tests either way.

This is how I started my function to parse the input:

```javascript
export function extractParams(input: string) {
  return {
    cols: undefined,
    matrix: undefined,
    rows: undefined,
    seconds: undefined,
  };
}
```

With that I could build a unit test for this function and make it fail.

```javascript
describe('extractParams', () => {
  it('returns parameters as object', () => {
    const settings = extractParams(sampleInput);

    expect(settings.cols).toBe(7);
    expect(settings.matrix).toEqual(expectedMatrix);
    expect(settings.rows).toBe(6);
    expect(settings.seconds).toBe(3);
  });
});
```

> Wait, what? Make it fail? - Yes. Making a test fail will help you check that the test is running correctly. Sometimes it is possible to write a test that will always pass (by accident or something) and you will get a false positive.

Once I got this test setup I started to implement `extractParams`.

```javascript
export function extractParams(input: string): Settings {
  const pieces = input.split('\n');

  const [rows, cols, seconds] = pieces[0]
    .split(' ')
    .map(setting => +setting);

  const matrix = pieces.slice(1)
    .map(row => row.split('').map(e => e === 'O' ? 3 : emptySlot));

  return {
    cols,
    matrix,
    rows,
    seconds, // hint: change *something* here for performance
  };
}
```

> What could've been better? - I could've used `substring` and `replace` instead of splitting the string and mapping the matrix.

I got the first line from the input and extracted the 3 numbers into 3 variables and then converted it from strings to numbers.

With the map I converted it to a matrix of numbers, replacing bombs with `3` (3 seconds to explode) and empty slots with `-1` which I called `emptySlot` (no magic numbers).

> Magic numbers? - From Wikipedia: "Unique values with unexplained meaning or multiple occurrences which could (preferably) be replaced with named constants"

The reason I choose to create a matrix was to be able to simulate the game, so I can know the exact state of the game at any second (for the end goal it doesn't matter to know if a bomb has 1, 2 or 3 seconds, it just matters if a bomb is there or not, but for fun it's cool).

Now that I had the parsed parameters I created another function, I called it `tick`. This is my generator function where each step in it is a second passing.

Step 1: Make the function fail a test.

Step 2: Test a scenario that doesn't exist then implement it.

I made so the function would decrement a second from the total and run some code returning a result each time a second pass.

The first scenario I implemented was the explosion, so when I'm iterating the matrix and find a `0` the "next state" of it is an explosion. The `tick` function doesn't need to know how to explode a bomb, it just has to set the map to a new state. So to handle the explosion I created a function explode.

```javascript
export function* tick({ cols, matrix, rows, seconds }: Settings) {
  let result = [
    ...matrix.map(row => [...row]),
  ];
  let currentSeconds = seconds + 1;

  while (currentSeconds--) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (result[row][col] === 0) {
          explode(result, { col, cols, row, rows });
        }
      }
    }

    yield result;
  }
}
```

> In my first version I was mistakenly exploding bombs at 1 second... [Off by 1 errors](https://twitter.com/codinghorror/status/506010907021828096) are kinda annoying right?

In the `explode` function I basically got the map and position where the bomb had to go off. So I started (after the failing test) to test exploding the slot the bomb is in.

```javascript
export function explode(matrix: Array<number[]>, { col, cols, row, rows }) {
  matrix[row][col] = emptySlot;
}
```

There were few things to watch out when I was implementing the other scenarios:

- Boundaries: I shouldn't change a position that doesn't even exist in the matrix (ex: col -1)
- Bombs explode at the same time: I can't clear the position of a bomb that is also exploding, because it is exploding "at the same time", so I need to keep it there until I get to it and make it explode

The final version of `explode` became:

```javascript
export function explode(matrix: Array<number[]>, { col, cols, row, rows }) {
  if (col - 1 >= 0) {
    matrix[row][col - 1] = nextStateAfterExplosion(matrix[row][col - 1]);
  }

  if (col + 1 < cols) {
    matrix[row][col + 1] = nextStateAfterExplosion(matrix[row][col + 1]);
  }

  if (row - 1 >= 0) {
    matrix[row - 1][col] = nextStateAfterExplosion(matrix[row - 1][col]);
  }

  if (row + 1 < rows) {
    matrix[row + 1][col] = nextStateAfterExplosion(matrix[row + 1][col]);
  }

  matrix[row][col] = emptySlot;
}
```

There are a lot of scenarios to test in this case:

- Bomb could be on
  - top left (no neighbors to the left or top)
  - middle left
  - bottom left
  - center
  - and so on...

By having a function to handle `nextStateAfterExplosion` we can test the change of state in there and not have to worry about it here. We can just test with the correct slots were changed and test edge cases.

An edge test case for `explode` (test if explodes correctly not having anything to the top and left):

```javascript
it('returns map with cleared neighbors after explosion', () => {
  const matrix = [
    [0, 2],
    [3, 1],
  ];
  const expected = [
    [emptySlot, emptySlot],
    [emptySlot, 1],
  ];

  explode(matrix, { col: 0, cols: 2, row: 0, rows: 2 });

  expect(matrix).toEqual(expected);
});
```

`nextStateAfterExplosion` was created to get the state the slot should be after the explosion.

If the neighbor bomb is exploding don't touch it, else clear whatever is in there.

```javascript
export function nextStateAfterExplosion(element: number) {
  return element === 0 ? element : emptySlot;
}
```

With tests covering all scenarios

```javascript
describe('nextState', () => {
  it('returns emptySlot value when seconds to explode is 3', () => {
    expect(nextStateAfterExplosion(3)).toBe(emptySlot);
  });

  it('returns emptySlot value when seconds to explode is 2', () => {
    expect(nextStateAfterExplosion(2)).toBe(emptySlot);
  });

  it('returns emptySlot value when seconds to explode is 1', () => {
    expect(nextStateAfterExplosion(1)).toBe(emptySlot);
  });

  it('returns 0 when seconds to explode is 0', () => {
    expect(nextStateAfterExplosion(0)).toBe(0);
  });

  it('returns emptySlot value when it is an empty slot', () => {
    expect(nextStateAfterExplosion(emptySlot)).toBe(emptySlot);
  });
});
```

At this point I had all the application flow required to make bombs explode. Next I had to go back to `tick` and make a second pass to empty slots and to bombs that were not yet ready to explode.

For empty slots and other bombs:

```javascript
export function* tick({ cols, matrix, rows, seconds }: Settings) {
  let result = [
    ...matrix.map(row => [...row]),
  ];
  let currentSeconds = seconds + 1;

  while (currentSeconds--) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (result[row][col] === 0) {
          explode(result, { col, cols, row, rows });
        }
        else {
          if (result[row][col] > 0) { // bomb not ready
            result[row][col] = nextStateAfterTick(result[row][col]);
          }
        }
      }
    }

    yield result;
  }
}
```

`nextStateAfterTick` is a function to get the next state of a empty slot or bomb (that is not exploding).

```javascript
export function nextStateAfterTick(element: number) {
  if (element === 0) {
    return element;
  }

  if (element === emptySlot) {
    return emptySlot;
  }

  return element - 1;
}
```

It might look like it is the *same* as `nextStateAfterExplosion`, but it isn't. Because when a explosion happen and the slot is a bomb in 2 seconds it will set the slot to empty (`-1`) instead of reducing a second from the bomb (`element - 1`).

> One possible alternative would be having the function take an extra parameter indicating if it is exploding or not. I decided to leave this way.

And I added tests for all paths on it.

```javascript
describe('nextStateAfterTick', () => {
  it('returns 2 when seconds to explode is 3', () => {
    expect(nextStateAfterTick(3)).toBe(2);
  });

  it('returns 1 when seconds to explode is 2', () => {
    expect(nextStateAfterTick(2)).toBe(1);
  });

  it('returns 0 when seconds to explode is 1', () => {
    expect(nextStateAfterTick(1)).toBe(0);
  });

  it('returns 0 when seconds to explode is 0', () => {
    expect(nextStateAfterTick(0)).toBe(0);
  });

  it('returns emptySlot value when it is an empty slot', () => {
    expect(nextStateAfterTick(emptySlot)).toBe(emptySlot);
  });
});
```

Now the code is handling bombs exploding, bombs not ready, empty slots. Great!

If we go back to the rules, there is one more thing that needs to be done. In a certain step Bomberman plants bombs in all slots without bombs.

To implement that I had to change `tick`.

```javascript
export function* tick({ cols, matrix, rows, seconds }: Settings) {
  let turn = 0;
  let result = [
    ...matrix.map(row => [...row]),
  ];
  let currentSeconds = seconds + 1;

  while (currentSeconds--) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (result[row][col] === 0) {
          explode(result, { col, cols, row, rows });
        }
        else {
          if (result[row][col] > 0) {
            result[row][col] = nextStateAfterTick(result[row][col]);
          }
        }
      }

      yield result;
    }

    // plant bombs
    if ((turn & 1) === 1) {
      result = [
        ...result.map(row => row.map(col => col === -1 ? 3 : col)),
      ];
    }

    turn++;
  }
}
```

Now I had all pieces and I could put them together:

```javascript
export function processData(input: string) {
  const settings = extractParams(input);

  const tickGen = tick(settings);

  let fieldState;

  // step all the way to the end
  // as I said, it doesn't make much sense here
  // but it is fun
  // we could make a replay of the game with it
  for (const state of tickGen) {
    fieldState = state;
  }

  return fieldState;
}
```

## Good practices

**S** from SOLID stands for *Single responsibility* and I think it was the key to build a nice solution to this challenge.

Breaking down the code in smaller functions that are responsible for specific things makes tasks way easier to accomplish, understand, test and change.

TypeScript also helped (it always helps). You can avoid a significant amount of issues and time loss while coding just by having your project in TypeScript.

I didn't have anyone to make a Code Review before I sent the code, that would probably make me write somethings different to improve my code.

I also didn't have, but I like, a "Tech Review". Before starting to implement something talk to a teammate about the thing you want to do, you might realize something way before it gets in the Code Review.

> This challenge reminded me of [<2 kyu> Binary Genetic Algorithms kata](http://www.codewars.com/kata/526f35b9c103314662000007) that a friend and I broke into a [series of 5 katas](https://www.codewars.com/kata/genetic-algorithm-series-number-1-generate). A really big and complex challenge was broken down into 5 easy ones.

> The funny thing about this is that it also applies to things in life, [big problems can be broken down in smaller ones](https://www.linkedin.com/pulse/small-wins-big-achievements-bruno-leonardo-michels/).

## Tests

With the tests I created and TypeScript I feel extremely confident to change anything, refactor at will.

## Debug

Well, one cool thing about generator function is that you can take a single step and check what is going on.

In the `tick` function we can set up `yield` after a single explosion, or second pass for a single bomb:

```javascript
if (result[row][col] === 0) {
  explode(result, { col, cols, row, rows });
  yield result; // here
}
else {
  if (result[row][col] > 0) {
    result[row][col] = nextStateAfterTick(result[row][col]);
  }
  yield result; // here
}
```

This way each step would be an interaction on a single slot, which might help to find problems (since exploding everything and checking the result later might be difficult).

## Drawing

I <3 Paint!

By [drawing the board in different states](https://i.imgur.com/9Ch06Qq.png) we can start to see some patterns. But don't assume that all patterns you see really exist from a single drawing, consider that different scenarios can change the results of what you see in this drawing.

Drawing is also good to get a better picture of what you're trying to do.

> Hint: if you want to find the fastest way possible, try drawing like that.

## Resources

- [Best practices - Principles](https://github.com/coding-wise/best-practices/tree/master/principles)
- [TypeScript](https://www.typescriptlang.org/)
- [Spotify's should-up](https://github.com/spotify/should-up)
- [Jasmine](https://www.npmjs.com/package/jasmine)
- [HackerRank](https://www.hackerrank.com/)
- [CodeWars](https://www.codewars.com/)
