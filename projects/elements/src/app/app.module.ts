import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NavComponent, NavModule } from 'nav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) { }
  ngDoBootstrap(): void {
    const element = createCustomElement(NavComponent, { injector: this.injector });
    if (!customElements.get('nav-ui')) {
      customElements.define('nav-ui', element);
    }
  }
}
