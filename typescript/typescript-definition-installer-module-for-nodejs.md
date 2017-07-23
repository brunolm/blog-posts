---
title: TypeScript definition installer module for NodeJS
tags: [node.js, typescript]
---

When developing a NodeJS application in TypeScript you need the definition files for the modules you are going to use. To make it easier to download them there is a module you can install called tsd.

To install tsd:

[code]npm i -g tsd[/code]
<!--more-->

With <code>tsd</code> you can type:

[code]tsd install express[/code]

The above will create folders and a file in your project:

[code]
typings
|- express
   |- express.d.ts
[/code]

You can watch how to do it here:
https://www.youtube.com/watch?v=FDW1UyyXVuM
