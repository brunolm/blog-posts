---
title: How to Write a Good Git Commit Message
tags: [git]
---

I've read [chris.beams.io/posts/git-commit/](http://chris.beams.io/posts/git-commit/). It is a guide on how to make your commit messages look good.

I follow most of it, but not everything. The way they tell us to make commit messages allow us to:

- Find and revert specific changes
- Find specific changes that can be applied elsewhere
- Know when and why things changed
- and more
<!--more-->

The website mentions:

- Make a clear title message
- Limit the title in 50 characters (so it can be viewed on terminals without breaking lines)
- Start the title in UPPERCASE (ex: "Add ...")
- Do not include punctuation at the end of the title
- Use imperative mode on title (when you make a merge Git itself creates a commit in imperative mode)
- After the title you may include a blank line followed by a new line with explanatory text

Example:

<a href="https://brunolm.files.wordpress.com/2017/01/gitcommitvscode.png"><img src="https://brunolm.files.wordpress.com/2017/01/gitcommitvscode.png" alt="gitcommitvscode" width="625" height="157" class="alignnone size-full wp-image-647" /></a>

I also try to always make *atomic commits*. Commits that can be added and removed without interfering with other things. For example, if my commit message says:

> Add a command to say Hello World

Then this is exactly what this commit is going to do if it is included in the repository. And if I remove it should remove only what I said it would add.

This way commits can get smaller and more precise. Giving you more control and a lot more visibility of what is going on.

What do you think? How do you do it?
