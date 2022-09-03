import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import ptbr from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { lineChartPlugin } from './dashboard/line-chart-plugin';

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
        NgChartjsModule,
        NgChartjsModule.registerPlugin([lineChartPlugin])
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: pt_BR,
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        ThemeConstantService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
