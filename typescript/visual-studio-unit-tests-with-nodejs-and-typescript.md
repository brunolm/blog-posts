---
title: Visual Studio Unit Tests with NodeJS and TypeScript
tags: [node.js, typescript, unit-tests]
---

Visual Studio has the magic window "Test Explorer" which discovers unit tests on your application and list them. It shows information about the tests.

<a href="https://brunolm.files.wordpress.com/2015/10/unittestnodejs.png"><img src="https://brunolm.files.wordpress.com/2015/10/unittestnodejs.png" alt="unittestnodejs" width="643" height="258" class="alignnone size-full wp-image-499" /></a>

It can be used on a NodeJS project.
<!--more-->

To do that, select the file which contains the tests on the solution explorer, click to view the file properties.

<a href="https://brunolm.files.wordpress.com/2015/10/testframework.png"><img src="https://brunolm.files.wordpress.com/2015/10/testframework.png" alt="testframework" width="446" height="212" class="alignnone size-full wp-image-500" /></a>

Enter a test framework (<code>ExportRunner</code> for example). If you are using ExportRunner then your tests will look like:

[code language="javascript"]
export function Test1()
{
    throw "fail";
}

export function Test2() { }
export function Test3() { }
export function Test4() { }
export function Test5() { }
[/code]

The test framework is automatically set if you create the file in Visual Studio selecting the right file type. You can also use other test frameworks, like Mocha.

Watch this video to see a complete example:
https://www.youtube.com/watch?v=8-U--ZUZB88
