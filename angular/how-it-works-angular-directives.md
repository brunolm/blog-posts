---
title: How it works: Angular Directives
tags: [angular, angular-4, directives]
---

Angular directives are custom attributes for elements. It allows you to manipulate the element.

```javascript
import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```
<!--more-->

Usage:

```html
This <span appHighlight>is</span> nice!
```

You can also manipulate the element during events such as `mouseenter` by using `@HostListener` decorator.

```javascript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

You can pass the color as a parameter by adding `@Input color: string` field. Note that if you have multiple directives and same field names (`color` on both for example) they are going to use the same value.

```html
<span appHighlight color="green">green highlight</span>
```

You can make it shorter by binding the color on the directive and aliasing the property, like this:

```javascript
@Input('appHighlight')
color: string;
```

And use:

```html
<span [appHighlight]="green">green highlight</span>
```

Complete code (tslint default config doesn't like input renaming):

```javascript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @Input('appHighlight') // tslint:disable-line no-input-rename
  color: string;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(this.color || 'red');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```


## Angular How it works series

Check out other posts of this series, [Angular How it works](/tag/how-it-works-angular/).
