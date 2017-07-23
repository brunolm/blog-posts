---
title: "Creating a node application with TypeScript and ts-node"
tags: [ts-node, typescript]
---

[`ts-node`](https://www.npmjs.com/package/ts-node) is a package that allows you to run TypeScript (`.ts`) files without a build step.

You can run a TypeScript project with:

```
ts-node src/index.ts
```
<!--more-->

You can combine `ts-node` with nodemon to restart the application on code changes:

```
nodemon --watch src/**/*.ts --exec ts-node src/index.ts
```

You can have your tests coded in TypeScript. You might need to add this on tsconfig.json:

```
"include": ["**/*.ts"]
```

And then you will be able to run the tests with:

```
mocha --compilers ts:ts-node/register,tsx:ts-node/register spec/**/*.ts
```

You can use a gulpfile.ts and have it run by just calling gulp:

```
gulp
```
