import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_DATE_LOCALE, NZ_I18N, pt_BR} from 'ng-zorro-antd/i18n';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import * as Sentry from '@sentry/angular';

import {registerLocaleData, PathLocationStrategy, LocationStrategy} from '@angular/common';
import ptbr from '@angular/common/locales/en';

import {AppRoutingModule} from './app-routing.module';
import {TemplateModule} from './shared/template/template.module';
import {SharedModule} from './shared/shared.module';

import {AppComponent} from './app.component';
import {CommonLayoutComponent} from './layouts/common-layout/common-layout.component';
import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';

import {ThemeConstantService} from './shared/services/theme-constant.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from './shared/interceptor/api.interceptor';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication/authentication.service';
import {ptBR} from 'date-fns/locale';

registerLocaleData(ptbr);

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzBreadCrumbModule,
    TemplateModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthenticationService) => () => authService.init(),
      deps: [AuthenticationService],
      multi: true
    },
    {
      provide: NZ_I18N,
      useValue: pt_BR,
    },
    {
      provide: NZ_DATE_LOCALE,
      useValue: ptBR,
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
      },
      deps: [Sentry.TraceService],
      multi: true,
    },
    ThemeConstantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
