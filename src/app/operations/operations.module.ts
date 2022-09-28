import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { SharedModule } from '../shared/shared.module';
import { OperationsFormComponent } from './operations-form/operations-form.component';
import {TextMaskModule} from 'angular2-text-mask';


@NgModule({
  declarations: [
    OperationsListComponent,
    OperationsFormComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        OperationsRoutingModule,
        TextMaskModule
    ]
})
export class OperationsModule { }

