import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AutomationsRoutingModule } from './automations-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { AutomationsFormComponent } from './automations-form/automations-form.component';
import { AutomationsListComponent } from './automations-list/automations-list.component';

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
    ...antdModule
  ]
})
export class AutomationsModule { }
