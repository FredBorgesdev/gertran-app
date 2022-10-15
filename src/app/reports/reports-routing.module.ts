import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadUnloadByMacroComponent} from './load-unload-by-macro/load-unload-by-macro.component';
import {LoadUnloadByPointComponent} from './load-unload-by-point/load-unload-by-point.component';
import {LoadUnloadByRadiusComponent} from './load-unload-by-radius/load-unload-by-radius.component';
import {TripsLateComponent} from './trips-late/trips-late.component';
import {TravelRequestsComponent} from './travel-requests/travel-requests.component';
import {AvailableVehiclesComponent} from './available-vehicles/available-vehicles.component';
import {LogisticsComponent} from './logistics/logistics.component';
import {TravelStartComponent} from './travel-start/travel-start.component';
import {TravelEndComponent} from './travel-end/travel-end.component';
import {ClosingComponent} from './closing/closing.component';
import {ScheduledTripsComponent} from './scheduled-trips/scheduled-trips.component';
import {InsuranceCompaniesComponent} from './insurance-companies/insurance-companies.component';

const routes: Routes = [
  {
    path: 'load-unload-by-macro',
    component: LoadUnloadByMacroComponent,
  },
  {
    path: 'load-unload-by-point',
    component: LoadUnloadByPointComponent,
  },
  {
    path: 'load-unload-by-radius',
    component: LoadUnloadByRadiusComponent,
  },
  {
    path: 'trips-late',
    component: TripsLateComponent,
  },
  {
    path: 'travel-requests',
    component: TravelRequestsComponent,
  },
  {
    path: 'available-vehicles',
    component: AvailableVehiclesComponent,
  },
  {
    path: 'logistics',
    component: LogisticsComponent
  },
  {
    path: 'travel-start',
    component: TravelStartComponent
  },
  {
    path: 'travel-end',
    component: TravelEndComponent
  },
  {
    path: 'closing',
    component: ClosingComponent
  },
  {
    path: 'scheduled-trips',
    component: ScheduledTripsComponent,
  },
  {
    path: 'insurance-companies',
    component: InsuranceCompaniesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
