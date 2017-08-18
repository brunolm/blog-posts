---
title: "Power NVM - A Node Version Manager for Windows"
tags: [node, nodejs, nvm]
---

[`nvm` is a popular](https://github.com/creationix/nvm) tool that runs on bash to manager node versions. [`power-nvm` is a version I created for Windows](https://github.com/brunolm/nvm), to install:

```
Install-Module -Name power-nvm
```

It has the following commands (for now):

```
nvm default <Version>   # set version as default
nvm install <Version>   # install version
nvm ls [Filter]         # list installed versions
nvm ls-remote [Filter]  # list released versions
nvm setdir <Path>       # set NODE main dir
nvm use <Version>       # use NODE version
```
<!--more-->

It sets a folder for the Node installation (also sets `$env:NODE_DIR`) and inside it creates a folder called `versions` where Node is "installed" when you run `nvm install <Version>`.

When you `nvm use <Version>` a version it adds `versions\<Version>` folder to the path in the current session only.

When you `nvm default <Version>` it copies the files from `versions\<Version>` to a level above, which is `$env:NODE_DIR` and that is included in the path.

When you `nvm ls` it shows all files installed in `versions` folder.

In the [README.md on github.com/brunolm/nvm](https://github.com/brunolm/nvm/blob/master/README.md) you can find examples and more.

Help commands are available:

```
help nvm
nvm <Command> -help [-full | -detailed | -examples]
```
