import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsTabComponent } from './permissions-tab/permissions-tab.component';
import {NzTransferModule} from 'ng-zorro-antd/transfer';
import {SharedModule} from '../shared/shared.module';

const antdModules = [
  NzTransferModule
];

@NgModule({
  declarations: [
    PermissionsTabComponent
  ],
  exports: [
    PermissionsTabComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ...antdModules,
  ]
})
export class PermissionsModule { }
