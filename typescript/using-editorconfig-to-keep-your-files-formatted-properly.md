---
title: Using editorconfig to keep your files formatted properly
tags: [editor, editorconfig]
---

Editor config is an extension available on [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [Atom](https://github.com/sindresorhus/atom-editorconfig#readme), [Vim](https://github.com/editorconfig/editorconfig-vim#readme) and many other editors, you can check a [complete list on the official website](http://editorconfig.org/#download).

<a href="https://brunolm.files.wordpress.com/2017/01/editorconfig-stickers.png"><img class="size-full wp-image-643 aligncenter" src="https://brunolm.files.wordpress.com/2017/01/editorconfig-stickers.png" alt="editorconfig-stickers" width="268" height="287" /></a>

It defines a set of rules that your editor follows. You can configure so that all your files, or just some matching the extension, will follow some rules as trim whitespace at the end, tabs as 2 spaces and so on.

This way your files will be consistent across your project, and allows people to contribute without making a mess in your codebase.
<!--more-->

To configure your first have to create a `.editorconfig` file. You can find a complete list of available properties on [Editorconfig's Github](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties).

I use this configuration in all node projects I create:

```js
root = true

[*]
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

It means:
- `root`: defines if this config file is the root of your project (plugins won't look in parent directories for `.editorconfig` files)
- `[*]`: matches all files
- `end_of_line`: lines ends in `\n`
- `insert_final_newline`: files always end in a new line
- `indent_style`: replace tabs with spaces to indent
- `indent_size`: use two spaces to indent
- `trim_trailing_whitespace`: remove whitespace after lines

This way you don't commit files with wrong line endings (it is also possible to configure on Git), you don't accidentally forget whitespace after a line, you don't get an indentation wrong. Git changes will always show precisely what changed.

It is possible to have multiple configs in the same file for different file extensions, if you are using JavaScript and Python you might want to have this:

```js
[*.{js,py}]
charset = utf-8

[*.py]
indent_style = space
indent_size = 4
```

To match files you can have a look on [File Format Details section on Editorconfig's page](http://editorconfig.org/#file-format-details).
