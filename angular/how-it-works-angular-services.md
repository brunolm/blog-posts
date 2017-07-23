---
title: "How it works: Angular Services"
tags: [angular, angular-4, how-it-works-angular, services]
---

Angular services are classes that perform operations, for example you can have `AuthService` class that will handle the user login making requests to an API.

```javascript
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() { }
}
```
<!--more-->

Services are decorated with `@Injectable`. This decorator generates metadata that is used later to inject dependencies. They are added in the module `providers` array:

```javascript
@NgModule({
  ...
  providers: [AuthService],
})
```

And then they can be retrieved in a component:

```javascript
@Component({ ... })
export class LoginComponent {
  constructor(private auth: AuthService) { }
}
```

When testing you can retrieve services in two ways:

```javascript
TestBed.get(AuthService);
// or
inject([AuthService], (authService) => { });
```

## Angular How it works series

Check out other posts of this series, [Angular How it works](/tag/how-it-works-angular/).
