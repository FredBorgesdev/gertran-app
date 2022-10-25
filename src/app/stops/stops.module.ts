import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopsRoutingModule } from './stops-routing.module';
import { StopsListComponent } from './stops-list/stops-list.component';
import { SharedModule } from '../shared/shared.module';
import { StopsStopComponent } from './stops-stop/stops-stop.component';
import { StopsFormComponent } from './stops-form/stops-form.component';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { StopsWorkingHoursComponent } from './stops-working-hours/stops-working-hours.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import { StopsMapComponent } from './stops-map/stops-map.component';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {environment} from '../../environments/environment';


const antdModules = [
  NzTransferModule,
  NzTimePickerModule,
];

@NgModule({
  declarations: [
    StopsListComponent,
    StopsStopComponent,
    StopsFormComponent,
    StopsWorkingHoursComponent,
    StopsMapComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        StopsRoutingModule,
        GooglePlaceModule,
        ...antdModules,
        NgxMapboxGLModule.withConfig({
          accessToken: environment.mapboxAccessToken,
        }),
    ]
})
export class StopsModule { }
