import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'
import { DriversFormComponent } from './drivers-form/drivers-form.component'
import { DriversListComponent } from './drivers-list/drivers-list.component'
import { DriversRoutingModule } from './drivers-routing.module';
import { DriversDriverComponent } from './drivers-driver/drivers-driver.component';
import { DriversProfilePictureComponent } from './drivers-profile-picture/drivers-profile-picture.component'
import { TextMaskModule } from 'angular2-text-mask';

const antdModule = []

@NgModule({
  declarations: [
    DriversListComponent,
    DriversFormComponent,
    DriversDriverComponent,
    DriversProfilePictureComponent
  ],
  imports: [
    SharedModule,
    DriversRoutingModule,
    TextMaskModule,
    ...antdModule
  ]
})
export class DriversModule {}
