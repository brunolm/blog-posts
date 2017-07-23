---
title: Creating an Angular application with @angular/cli
tags: [angular, angular-4, typescript]
---

@angular/cli is a package that allows you to create/run/test/build an Angular application.

<a href="https://brunolm.files.wordpress.com/2017/07/angular-cli.png"><img class="alignnone size-full wp-image-724" src="https://brunolm.files.wordpress.com/2017/07/angular-cli.png" alt="" width="625" height="290" /></a>

You can install it globally

```
npm i -g @angular/cli
```

If you run the cli commands in a project that also has the cli installed it will use the project cli version instead.
<!--more-->

# Why @angular/cli and not my bootstrap?

Well, there are so many things you have to configure to get to the same level... webpack (and all those loaders), webpack-dev-server, jasmine, karma, protractor, tslint, typescript...

If you don't want everything it creates there is actually a `--minimal` parameter on `ng new`.

# Commands

All commands have a `--help` that provides a lot of useful information. Also [the documentation can be found here](https://github.com/angular/angular-cli/wiki).

## ng new

`ng new` is a command that generates an Angular application for you, if you want to use SCSS you have to run with the parameter `--style scss`.

If you already generated and want to change to SCSS you can edit `defaults.styleExt` in the file `.angular-cli.json`, or run the command `ng set defaults.styleExt scss`. But you will have to rename files manually.

## ng generate

`ng generate` can be used to generate classes, components, directives, enums, pipes, services... It automatically create the files for you.

Example:

```
ng g c login
```

Output:

```
installing component
create src\app\login\login.component.css
create src\app\login\login.component.html
create src\app\login\login.component.spec.ts
create src\app\login\login.component.ts
update src\app\app.module.ts
```

# ng serve

`ng serve` builds the app and starts a server, behind the scenes it starts a `webpack-dev-server` on port 4200.

# ng lint

`ng lint` will run tslint on your application.

# ng test

`ng test` will run your applications tests (`.spec.ts` files).

# ng e2e

`ng e2e` will run your application end-to-end tests (not the same as `ng test`).

# ng build

`ng build` will build your application, you can generate production assets by running `ng build --prod`.

# ng get / ng set

`ng get` will get a value from the configuration (`.angular-cli.json`). `ng set` will update a value on the configuration.

# ng doc

`ng doc` will open Angular documentation with the specified keyword.

# ng eject

`ng eject` will extract files and configuration from @angular/cli making it no longer required. It then changes package.json to use `webpack-dev-server`, `webpack`, `karma` and other libraries directly. It also extracts `webpack.config.js` allowing you to change how the app is built.

# ng xi18n

`ng xi18n` extracts i18n messages from the templates.
