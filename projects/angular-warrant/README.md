# @warrantdev/angular-warrant

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0.

## Overview

The Warrant Angular library provides a route guard and component for controlling access to pages and components in Angular using [Warrant](https://warrant.dev/). The library interacts directly with the Warrant API using short-lived session tokens that must be created server-side using your API key. Refer to [this guide](https://docs.warrant.dev/guides/creating-session-tokens) to see how to generate session tokens for your users.

## Installation

Use `npm` to install the module:

```sh
npm install @warrantdev/angular-warrant
```

## Usage
To start using the SDK in your application, import `AngularWarrantModule` and configure it with your client key:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the module from the SDK
import { AngularWarrantModule } from 'angular-warrant';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Import the module into the application, with configuration
    AngularWarrantModule.forRoot({
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
```
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

```
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

```
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
            objectType: 'role',
            objectId: 'owner',
            relation: 'member',
          },
        ],
      }
    },
    {
      id: 2,
      name: 'Phone Mini',
      price: 699,
      description: 'A great phone with one of the best cameras',
      warrantCheck: {
        warrants: [
          {
            objectType: 'role',
            objectId: 'owner',
            relation: 'member',
          },
        ],
      }
    },
  ];
}
```

## Support for Multiple Warrants

`warrants` contains the list of warrants evaluted to determine if the user has access. If `warrants` contains multiple warrants, the `op` parameter is required and specifies how the list of warrants should be evaluated.

**anyOf** specifies that the access check request will be authorized if *any of* the warrants are matched and will not be authorized otherwise.

**allOf** specifies that the access check request will be authorized if *all of* the warrants are matched and will not be authorized otherwise.

```javascript
// User is authorized if they are a 'viewer' of protected_item OR a 'viewer' of 'another_protected_item'
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
            objectId: 'protected_item',
            relation: 'viewer',
          },
        ],
      }
    },
    {
      id: 2,
      name: 'Phone Mini',
      price: 699,
      description: 'A great phone with one of the best cameras',
      warrantCheck: {
        warrants: [
          {
            objectType: 'item',
            objectId: 'another_protected_item',
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
`@warrantdev/vue-warrant` with small but backwards-incompatible fixes to the type
declarations. These changes will not affect Warrant itself.

## Warrant Documentation

- [Warrant Docs](https://docs.warrant.dev/)
