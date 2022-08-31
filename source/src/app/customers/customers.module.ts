import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersFormComponent } from './customers-form/customers-form.component'



const antdModule = []

@NgModule({
  declarations: [
    CustomersListComponent,
    CustomersFormComponent
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule,
    ...antdModule
  ],
  exports: []
})
export class CustomersModule { }
