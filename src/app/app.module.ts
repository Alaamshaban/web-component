
import { BrowserModule } from '@angular/platform-browser';
import { ANALYZE_FOR_ENTRY_COMPONENTS, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CookieModule } from 'ngx-cookie';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { NavModule } from 'nav';
import { MatButtonModule } from '@angular/material/button';
import { LazyElementsModule } from '@angular-extensions/elements';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'roomrack',
    redirectTo: '',
  },
  {
    path: 'reservations/individual',
    redirectTo: '',
  },
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    FlexLayoutModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    LazyElementsModule,
    CookieModule.forRoot(),
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
