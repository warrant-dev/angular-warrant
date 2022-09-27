# @warrantdev/angular-warrant

[![npm](https://img.shields.io/npm/v/@warrantdev/angular-warrant)](https://www.npmjs.com/package/@warrantdev/angular-warrant)
[![Slack](https://img.shields.io/badge/slack-join-brightgreen)](https://join.slack.com/t/warrantcommunity/shared_invite/zt-12g84updv-5l1pktJf2bI5WIKN4_~f4w)

## Overview

The Warrant Angular library provides a route guard and component for controlling access to pages and components in Angular using [Warrant](https://warrant.dev/). The library interacts directly with the Warrant API using short-lived session tokens that must be created server-side using your API key. Refer to [this guide](https://docs.warrant.dev/guides/creating-session-tokens) to see how to generate session tokens for your users.

## Installation

Use `npm` to install the module:

```sh
npm install @warrantdev/angular-warrant
```

## Usage
To start using the SDK in your application, import `WarrantModule` and configure it with your client key:
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the module from the SDK
import { WarrantModule } from 'angular-warrant';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Import the module into the application, with configuration
    WarrantModule.forRoot({
      clientKey: "client_test_f5dsKVeYnVSLHGje44zAygqgqXiLJBICbFzCiAg1E=",
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### **Setting the Session Token**
In order to finish initializing the library and begin performing access checks in your app, you must provide a server-generated session token and set it using the `setSessionToken` method. Otherwise requests from your Angular application will be denied by the Warrant API.

Set the session token using the `setSessionToken` method:
```javascript
// login.component.ts
export class LoginComponent {
    onSubmit() {
        this.accountService.login(this.username, this.password)
            .subscribe(data => {
                // NOTE: This session token must be generated
                // server-side when logging users into your
                // application and then passed to the client.
                // Access check calls in this library will fail
                // if the session token is invalid or not set.
                this.warrantService.setSessionToken(data.warrantSessionToken);)
            });
    }
}
```

### `WarrantProtectedComponent`
`WarrantProtectedComponent` is a utility component you can wrap around markup or components that should only be accessible to users with certain privileges. It only renders the components it wraps if the user has the given warrant.

```html
// product-list.component.html
<div *ngFor="let product of products">
  <h3>
    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>
  </h3>

  <warrant-protected-component [warrantCheck]="product.warrantCheck">
    <p *ngIf="product.description">Description: {{ product.description }}</p>

    <button type="button" (click)="share()">Share</button>

    <app-product-alerts [product]="product" (notify)="onNotify()">
    </app-product-alerts>
  </warrant-protected-component>
</div>
```

```javascript
// product-list.component.ts
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products = [
    {
      id: 1,
      name: 'Phone XL',
      price: 799,
      description: 'A large phone with one of the best screens',
      warrantCheck: {
        warrants: [
          {
            objectType: 'item',
            objectId: 'phone_xl',
            relation: 'viewer',
          },
        ],
      }
    }
  ];
}
```

## Support for Multiple Warrants

`warrants` contains the list of warrants evaluted to determine if the user has access. If `warrants` contains multiple warrants, the `op` parameter is required and specifies how the list of warrants should be evaluated.

**AnyOf** specifies that the access check request will be authorized if *any of* the warrants are matched and will not be authorized otherwise.

**AllOf** specifies that the access check request will be authorized if *all of* the warrants are matched and will not be authorized otherwise.

```javascript
import { WarrantCheckOp } from '@warrantdev/angular-warrant';

// User is authorized if they are a 'viewer' of item `protected_item` OR a 'viewer' of store `protected_store`
export class ProductListComponent {
  products = [
    {
      id: 1,
      name: 'Phone XL',
      price: 799,
      description: 'A large phone with one of the best screens',
      warrantCheck: {
        op: WarrantCheckOp.AnyOf,
        warrants: [
          {
            objectType: 'item',
            objectId: 'protected_item',
            relation: 'viewer',
          },
          {
            objectType: 'store',
            objectId: 'protected_store',
            relation: 'viewer',
          },
        ],
      }
    },
  ];
}
```

## Notes
We’ve used a random Client Key in these code examples. Be sure to replace it with your
[actual Client Key](https://app.warrant.dev) to
test this code through your own Warrant account.

For more information on how to use the Warrant API, please refer to the
[Warrant API reference](https://docs.warrant.dev).

## TypeScript support

This package includes TypeScript declarations for Warrant.

Note that we may release new [minor and patch](https://semver.org/) versions of
`@warrantdev/angular-warrant` with small but backwards-incompatible fixes to the type
declarations. These changes will not affect Warrant itself.

## Warrant Documentation

- [Warrant Docs](https://docs.warrant.dev/)
