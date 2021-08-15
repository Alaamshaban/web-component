# CloudinnNav

## How to use?
1. Create directory `hooks`, and put [preinstall.sh](https://bitbucket.org/snippets/cloudinn/qebRXy) to it
2. In your `package.json` add the preinstall script under the scripts section and the `nav` package in dependencies
```json
{
    "scripts": {
        "preinstall": "bash hooks/preinstall.sh"
    },
    "dependencies": {
        "nav": "file:hooks/temp/package/"
    }
}
```
3. Run `npm install`, and make sure to install all the peer requirements
4. In your `app.module.ts` file, import the nav module
```typescript
import { NavModule } from 'nav';
```
```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
5. Follow the required steps for Angular Material here https://material.angular.io/guide/getting-started
6. Wrap your application html in the `cloudinn-nav` tag
```html
<cloudinn-nav>
    <app-mycomponent></app-mycomponent>
</cloudinn-nav>
```
7. In your root component, import and inject `NavService` and supply your navigation lists. `title` and `path` are mandatory while `icon` is optional. Value of `icon` is icon name from material icons.
```typescript
import { NavService } from 'nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navData = {
    title: 'Front Disk',
    showSideNav: true,
    sideNav: [
      {
        title: 'Room Rack',
        path: '/roomrack',
        icon: 'grid_on'
      },
      {
        title: 'Individual Reservations',
        path: '/reservations/individual'
      }
    ],
    apps: [
      {
        title: 'POS',
        path: '/pos',
        icon: 'tablet'
      },
      {
        title: 'Billing',
        path: '/billing'
      }
    ]
  };
  constructor(private nav: NavService) {
    this.nav.setNavData(this.navData);
  }
}
```
---
project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
