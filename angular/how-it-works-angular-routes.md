---
title: "How it works: Angular Routes"
tags: [angular, angular-4, how-it-works-angular, routes]
---

Angular routes allows you to setup how your components are going to show up in the page.

Routes can be guarded (like require a login to access) and they can be nested (you can have components render components in a specific route).

Routes can also be setup as lazy, they will only load the component when needed. And you can delegate the loading to sub modules.
<!-- more -->

## "Full" setup

You can check a "full" setup in this [plnkr example - setting up Angular routes with lazy load and child routes](https://embed.plnkr.co/Ew66tMHK7jIx3vhg8Vrf/).

## The basics

```typescript
export const routes: Routes = [
  // if it hits root then go to fooroute
  { path: '', redirectTo: 'fooroute', pathMatch: 'full' },

  // if it hits this route then render FooComponent
  { path: 'fooroute', component: FooComponent },

  // if no routes were found falls into this one that renders Notfound
  { path: '**', component: NotfoundComponent },
];
```

## Route with parameters

You can use `:name` to declare parameters in your route.

```typescript
{ path: 'heroes/:id', component: HeroesComponent },
```

To create links passing parameters you can pass an array with the route and all parameters, like this:

```html
<a [routerLink]="['heroes', 1]">Saitama</a>
```

To access the parameters you need `private route: ActivatedRoute` on your constructor to get route information, and you need to implement `OnInit` and `OnDestroy`.

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({...})
export class HeroesComponent implements OnInit, OnDestroy {
  id: any;
  sub: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
```

## Route with guard

A guard is a class that implements `CanActivate` or `CanActivateChild`. In a single route (as the examples above) you might want to use `CanActivate`, but when you have child routes you might want to use `CanActivateChild` (for example in `/admin` routes protecting everything inside it).

Both interfaces are do the samething, they have a method that returns `true` or `false` and can redirect you to another page (ex: login page).

An example that could be used to protect an admin area, only allow access if the user is logged in.

```typescript
import { CanActivateChild, Router } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router) { }

  canActivateChild() {
    if (localStorage.getItem('user')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
```

## Route with lazy and children

```typescript
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/auth.guard'; // see previous example
import { ModuleWithProviders } from '@angular/core';

import { InternalComponent } from 'src/layouts/internal.component';
import { PublicComponent } from 'src/layouts/public.component';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },

  {
    path: '',
    canActivateChild: [AuthGuard], // protects all heroes routes
    component: InternalComponent,
    children: [
      { path: 'heroes', loadChildren: 'src/heroes/heroes.module#HeroesModule' },
    ],
  },

  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'login', loadChildren: 'src/login/login.module#LoginModule' },
      // { path: 'error', loadChildren: 'src/error/error.module#ErrorModule' },
    ],
  },

  // { path: '**', redirectTo: 'error' },
];

export const router: ModuleWithProviders = RouterModule.forRoot(routes);
```

## Module setup

In app.module

```typescript
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
```

In sub modules (if lazy loading)

```typescript
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
```

If I'm missing a piece of configuration here, then check the [plnkr example - setting up Angular routes with lazy load and child routes](https://embed.plnkr.co/Ew66tMHK7jIx3vhg8Vrf/) which is working and you can complete the error route for practice. :)
