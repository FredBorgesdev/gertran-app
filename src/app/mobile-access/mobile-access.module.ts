import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileAccessRoutingModule } from './mobile-access-routing.module';
import { MobileAccessListComponent } from './mobile-access-list/mobile-access-list.component';
import { SharedModule } from '../shared/shared.module';
import { MobileAccessFormComponent } from './mobile-access-form/mobile-access-form.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [
    MobileAccessListComponent,
    MobileAccessFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MobileAccessRoutingModule,
    NzSwitchModule
  ]
})
export class MobileAccessModule { }
