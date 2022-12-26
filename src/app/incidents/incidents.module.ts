import { NgModule } from '@angular/core';

import { IncidentsRoutingModule } from './incidents-routing.module';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    IncidentsRoutingModule,
    GooglePlaceModule,
  ],
  exports: []
})
export class IncidentsModule { }
