import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DdrsRoutingModule} from './ddrs-routing.module';
import {DdrsListComponent} from './ddrs-list/ddrs-list.component';
import {SharedModule} from '../shared/shared.module';
import {DdrsFormComponent} from './ddrs-form/ddrs-form.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";


@NgModule({
  declarations: [
    DdrsListComponent,
    DdrsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DdrsRoutingModule,
    NzSwitchModule
  ]
})
export class DdrsModule {
}
