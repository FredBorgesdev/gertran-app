import { NgModule } from '@angular/core';

import { ClosingCustomerRoutingModule } from './closing-customers-routing.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ClosingCustomerRoutingModule,
  ],
  exports: []
})
export class ClosingCustomersModule { }
