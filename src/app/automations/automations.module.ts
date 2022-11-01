import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AutomationsRoutingModule } from './automations-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { AutomationsFormComponent } from './automations-form/automations-form.component';
import { AutomationsListComponent } from './automations-list/automations-list.component';
import {NzTransferModule} from 'ng-zorro-antd/transfer';
import {DragDropModule} from '@angular/cdk/drag-drop';

const antdModule = [];

@NgModule({
  declarations: [
    SettingsComponent,
    AutomationsFormComponent,
    AutomationsListComponent,
  ],
  imports: [
    SharedModule,
    AutomationsRoutingModule,
    ...antdModule,
    NzTransferModule,
    DragDropModule
  ]
})
export class AutomationsModule { }
