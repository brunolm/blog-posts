---
title: "The N-Layer tier project architecture"
tags: [architecture, c#, solution]
---

There are many ways to split up your solution structure in many layers. My favorite way of doing it is as the diagram bellow describes:

<a href="https://brunolm.files.wordpress.com/2015/03/2015-19-03-06-19-54-313.png"><img class="alignnone wp-image-59 size-full" src="https://brunolm.files.wordpress.com/2015/03/2015-19-03-06-19-54-313.png" alt="2015-19-03 06-19-54-313" width="726" height="589" /></a>

<!--more-->I have:
<ul>
	<li><strong>Presentation layer</strong>: where my screens/pages are, all they know is how to display data they receive</li>
	<li><strong>Services layer</strong>: where all my business rules are, the services classes are responsible for manipulating data</li>
	<li><strong>Data layer</strong>: where my database access and my database models are</li>
	<li><strong>Crosscutting</strong>: classes used by the entire solution, <a title="Crosscutting concerns" href="https://msdn.microsoft.com/en-us/library/ee658105.aspx" target="_blank">read more about it on MSDN</a></li>
</ul>
Another example which looks very similar is one <a title="Traditional N-Layer Tier" href="https://code.msdn.microsoft.com/windowsdesktop/Traditional-N-tier-80f841c2" target="_blank">posted on MSDN</a>

<a href="https://brunolm.files.wordpress.com/2015/03/sa-21.png"><img class="alignnone wp-image-60 size-full" src="https://brunolm.files.wordpress.com/2015/03/sa-21.png" alt="sa-21" width="565" height="476" /></a>

This is enough to keep your solution clean and with a clear separation on concerns.

The hint is to avoid complicating what does not need complicating.
