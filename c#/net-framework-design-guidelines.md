---
title: "General naming rules from .NET Framework Design Guidelines"
tags: [.net, guidelines, naming]
---

The <a href="https://msdn.microsoft.com/en-us/library/ms229042(v=vs.110).aspx" target="_blank">.NET Framework Design Guidelines</a> is a set of guidelines provided by Microsoft to keep an unified programming model.

In this post I am going to summarize some of the main rules, but you should really read the entire document.
<!--more-->

<h2>Capitalization Conventions</h2>

<ul>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Namespace</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Classes</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Interfaces</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Structs</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Type</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Interface</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Method</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Property</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Event</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for static/readonly/const Fields</li>
    <li><strong>√ DO</strong> use <strong>P</strong>ascal<strong>C</strong>asing for Enum names and values</li>
    <li><strong>√ DO</strong> use camel<strong>C</strong>asing for member variables</li>
    <li><strong>√ DO</strong> use camel<strong>C</strong>asing for parameters</li>
    <li><strong>√ DO</strong> use camel<strong>C</strong>asing for local variables</li>
</ul>

<h2>Naming Guidelines</h2>

<ul>
    <li><strong>√ DO</strong> name boolean variables with an affirmation (Visible; CanSeek...)</li>
    <li><strong>Optionally</strong> you can also prefix boolean variables with "Is", "Can" or "Has", but only where it adds value</li>
    <li><strong>√ DO</strong> choose readability over brevity</li>
    <li><strong>√ DO</strong> choose easily readable and meaningful names</li>
    <li><strong>√ DO</strong> use generic CLR type names (use int instead of Int32)</li>
    <li><strong>√ DO</strong> name a namespace after this template &lt;Company&gt;.(&lt;Product&gt;|&lt;Technology&gt;)[.&lt;Feature&gt;][.&lt;Subnamespace&gt;]</li>
</ul>
<ul>
    <li><strong>X DO NOT</strong> use underscores, hyphens, or any other nonalphanumeric characters  (_, m_, s_, etc.)</li>
    <li><strong>X DO NOT</strong> use Hungarian notation</li>
    <li><strong>X DO NOT</strong> use abbreviations or contractions as part of identifier names</li>
</ul>

<h2>Prefixes and Suffixes</h2>

<ul>
    <li><strong>√ DO</strong> prefix Interfaces names with the letter "I"</li>
    <li><strong>√ DO</strong> prefix descriptive type parameters with the letter "T" (TSource...)</li>
    <li><strong>√ DO</strong> suffix custom attribute classes with "Attribute"</li>
    <li><strong>√ DO</strong> suffix event args classes with "EventArgs"</li>
    <li><strong>√ DO</strong> suffix custom exception classes with "Exception"</li>
    <li><strong>√ DO</strong> suffix set of elements classes with "Collection"</li>
    <li><strong>√ DO</strong> suffix custom stream classes with "Stream"</li>
</ul>

<h2>Class Structure</h2>

Usings statements should be inside the namespace.

The order of elements in classes should be:

<ul>
    <li>Fields</li>
    <li>Constructors</li>
    <li>Properties</li>
    <li>Events</li>
    <li>Methods</li>
    <li>Private interface implementations</li>
    <li>Nested types</li>
</ul>

And each group should have their elements in alphabetical order.

<h3>See also</h3>

There is also <a href="http://blogs.msdn.com/b/brada/archive/2005/01/26/361363.aspx" target="_blank">a post from Brad Abrams</a> that summarizes some of the guidelines.
