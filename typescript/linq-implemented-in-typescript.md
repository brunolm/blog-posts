---
title: "Linq implemented in TypeScript"
tags: [linq, typescript]
---

<a title="The power of Linq" href="https://brunolm.wordpress.com/2015/03/08/the-power-of-linq/" target="_blank">Linq, the powerful system introduced on .NET 3.5</a> is a set of methods that allows you to manipulate collections and data.

I brought <a href="https://github.com/brunolm/TSLinq" target="_blank">those methods to TypeScript, the source code is on my Github</a>.
<!--more-->

<a href="https://brunolm.files.wordpress.com/2015/03/2015-06-08-06-06-32-819.png"><img class="alignnone  wp-image-200" src="https://brunolm.files.wordpress.com/2015/03/2015-06-08-06-06-32-819.png" alt="2015-06-08 06-06-32-819" width="907" height="799" /></a>

The syntax is quite similar and the usage is essentially the same.

[code language="javascript"]
var three = [1, 2, 3].AsLinq().FirstOrDefault(o => o == 3);
[/code]

I also created a <a href="https://visualstudiogallery.msdn.microsoft.com/34b2cc77-971a-4226-8f93-54518a7917ae" target="_blank">Visual Studio Extension to enable TypeScript in Unit Tests</a>.
