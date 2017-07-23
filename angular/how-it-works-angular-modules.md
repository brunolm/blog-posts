---
title: How it works: Angular Modules
tags: [angular, angular-4, how-it-works-angular, modules]
---

Angular modules are containers for different parts of your app.

You can have nested modules, your `app.module` is already actually nesting other modules such as `BrowserModule` and you can add `RouterModule` and so on.

A module is a class with the `@NgModule` decorator

```javascript
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
  bootstrap: [AppComponent]
  declarations: [AppComponent],
  exports: [],
  imports: [BrowserModule],
  providers: [],
})
export class AppModule { }
```
<!--more-->

To create a module we add `@NgModule` passing some parameters:

- `bootstrap`: The component that will be the root of your application. This configuration is only present on your root module
- `declarations`: Resources the module declares. When you add a new component you have to update the declarations (`ng generate component` does it automatically)
- `exports`: Resources the module exports that can be used in other modules
- `imports`: Resources the module uses from other modules (only module classes are accepted)
- `providers`: Resources that can be injected (di) in a component

A minimum App module is composed by:

- `AppComponent`: The main component of your app (see [Components](/2017/07/21/how-it-works-angular-components))
- `BrowserModule`: The module required for your app to run in a browser


## Angular How it works series

Check out other posts of this series, [Angular How it works](/tag/how-it-works-angular/).
