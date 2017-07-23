---
title: "How it works: Angular Components"
tags: [angular, angular-4, components, how-it-works-angular]
---

Angular components are elements composed by a template that will render your application.

```javascript
import { Component } from '@angular/core';

@Component({
  providers: [],
  selector: 'app-required',
  styleUrls: ['required.component.scss'],
  // template: `This field is required.`,
  templateUrl: 'required.component.html',
})
export class RequiredComponent { }
```
<!--more-->

To create a component we add `@Component` passing some parameters:

- `providers`: Resources that will be injected into the component constructor
- `selector`: The query selector that will find the element in the HTML and replace by the component
- `styles`: Inline styles. NOTE: DO NOT use this parameter with `require`, it works on development but when you build the application in production all your styles are lost
- `styleUrls`: Array of path to style files
- `template`: String that contains your HTML
- `templateUrl`: Path to a HTML file

There are many other parameters, but those are the main ones. Note that you should use `style` or `styleUrls`, not both. Same for `template` and `templateUrl`, don't use both. I would recommend always using `styleUrls` and `templateUrl`.

## Styles

Styles here are different from your application style file, anything applied in the component will be restricted to this scope. For example, say you add:

```css
div { background: red; }
```

All divs inside the component will be red, but if you have other components, other `div`s in your HTML they will not be changed at all.

## Template

Templates are HTML files that have a syntax that is parsed by Angular.

### Variables

If in your class you have a field, say `name`, you can display this name in the template by adding

```
{{ name }}
```

### Nested components

You can have nested component by adding them in the template with the selector markup

```html
<app-login></app-login>
```

You can pass values to a component

```html
<app-login title="Something"></app-login>
```

but for that on your `LoginComponent` you will need do add a field on the class with the `@Input()` decorator

```javascript
@Input()
title: String;
```

### Bindings

You can bind things to your component class fields

```html
div [hidden]="shouldHide"
```

You can bind events to your component class methods (`$event` is a special variable that carries the event object of the triggered action)

```html
<form (onSubmit)="onSubmit($event)"></form>
```

You can make a two-way binding, you need to import the `FormsModule` in your app module. This is cool, but **not recommended**, it isn't good for testing, it's slow...

```html
<input type="text" [(ngModel)]="someName" />
```

Instead of two-way binding you should use the tools available in `ReactiveFormsModule`.

### Pipes

Pipes are functions that transform values. You can use, for example:

```
{{ name|lower }}
```

To display a "name" in lowercase. There are some built-in pipes but you can also create custom ones.


## Angular How it works series

Check out other posts of this series, [Angular How it works](/tag/how-it-works-angular/).
