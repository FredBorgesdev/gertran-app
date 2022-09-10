import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';
import { <%= classify(name) %>ListComponent } from './<%= dasherize(name) %>-list/<%= dasherize(name) %>-list.component';
import { SharedModule } from '../shared/shared.module';
import { <%= classify(name) %>FormComponent } from './<%= dasherize(name) %>-form/<%= dasherize(name) %>-form.component';


@NgModule({
  declarations: [
    <%= classify(name) %>ListComponent,
    <%= classify(name) %>FormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    <%= classify(name) %>RoutingModule
  ]
})
export class <%= classify(name) %>Module { }

