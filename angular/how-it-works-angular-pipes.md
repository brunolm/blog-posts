---
title: How it works: Angular Pipes
tags: [angular, angular-4, how-it-works-angular, pipes]
---

Angular pipes are functions that transform values. There are some built-in pipes and you can create your own pipes.

```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'required' })
export class RequiredPipe implements PipeTransform {
  transform(value: string, ...args: any[]) {
    return `The field ${value} is required.`;
  }
}
```
<!--more-->

To create a pipe you have to decorate a class with `@Pipe` passing in a name. And you class must implement `PipeTransform`, this requires you to create a function that will receive a value and 0 to N parameters.

Pipes can be chained, `{{ birthday | date | lowercase }}`.

You can pass parameters to pipes

- `{{ 4.20 | currency:'USD':true }}`: $4.20
- `{{ 4.20 | currency:'USD':false }}`: USD4.20

## Built-in pipes (main ones)

- `{{ obj | json }}` // {"name":"Bruno"}
- `{{ dateObj | date }}` // Jan 01, 2017
- `{{ value | uppercase }}` // TEXT
- `{{ value | lowercase }}` // text
- `{{ 4.20 | currency:'USD':true }}` // $4.20
- `{{ 0.03 | percent }}` // 3%


## Angular How it works series

Check out other posts of this series, [Angular How it works](/tag/how-it-works-angular/).
