import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { SharedModule } from '../shared/shared.module';
import { OperationsFormComponent } from './operations-form/operations-form.component';
import {TextMaskModule} from 'angular2-text-mask';
import { OperationsOperationComponent } from './operations-operation/operations-operation.component';
import { OperationsRulesByValueTabComponent } from './operations-rules-by-value-tab/operations-rules-by-value-tab.component';


@NgModule({
  declarations: [
    OperationsListComponent,
    OperationsFormComponent,
    OperationsOperationComponent,
    OperationsRulesByValueTabComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        OperationsRoutingModule,
        TextMaskModule
    ]
})
export class OperationsModule { }

