import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalsRoutingModule } from './terminals-routing.module';
import {SharedModule} from '../shared/shared.module';
import {TerminalsListComponent} from './terminals-list/terminals-list.component';
import {TerminalGroupsListComponent} from './terminal-groups-list/terminal-groups-list.component';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import { TerminalsFormComponent } from './terminals-form/terminals-form.component';
import {NzTransferModule} from 'ng-zorro-antd/transfer';
import { TerminalGroupsCreateComponent } from './terminal-groups-create/terminal-groups-create.component';

const antdModules = [
  NzCollapseModule
];

@NgModule({
  declarations: [
    TerminalsListComponent,
    TerminalGroupsListComponent,
    TerminalsFormComponent,
    TerminalGroupsCreateComponent,
  ],
  imports: [
    CommonModule,
    TerminalsRoutingModule,
    SharedModule,
    ...antdModules,
    NzTransferModule,
  ]
})
export class TerminalsModule { }
