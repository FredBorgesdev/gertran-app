import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { LoadUnloadByMacroComponent } from './load-unload-by-macro/load-unload-by-macro.component';
import {SharedModule} from '../shared/shared.module';
import { BaseCustomerFilterComponent } from './filters/base-customer-filter/base-customer-filter.component';
import { LoadUnloadByPointComponent } from './load-unload-by-point/load-unload-by-point.component';
import { LoadUnloadByRadiusComponent } from './load-unload-by-radius/load-unload-by-radius.component';
import { TripsLateComponent } from './trips-late/trips-late.component';
import { TravelRequestsComponent } from './travel-requests/travel-requests.component';
import { BaseGenericFiltersComponent } from './filters/base-generic-filters/base-generic-filters.component';
import { AvailableVehiclesComponent } from './available-vehicles/available-vehicles.component';
import { LogisticsComponent } from './logistics/logistics.component';
import { TravelStartComponent } from './travel-start/travel-start.component';
import { BaseVehicleFilterComponent } from './filters/base-vehicle-filter/base-vehicle-filter.component';
import { TravelEndComponent } from './travel-end/travel-end.component';
import { ClosingComponent } from './closing/closing.component';
import { ScheduledTripsComponent } from './scheduled-trips/scheduled-trips.component';
import { InsuranceCompaniesComponent } from './insurance-companies/insurance-companies.component';
import { CommandsHistoryComponent } from './commands-history/commands-history.component';
import { PositionsHistoryComponent } from './positions-history/positions-history.component';
import { BaitsComponent } from './baits/baits.component';
import { OperationalAuditCommandsComponent } from './operational-audit-commands/operational-audit-commands.component';
import {BaseUserFilterComponent} from './filters/base-user-filter/base-user-filter.component';
import { OperationalAuditMessagesComponent } from './operational-audit-messages/operational-audit-messages.component';
import { MacrovehicleComponent } from './macrovehicle/macrovehicle.component';
import { BaseMacroFilterComponent } from './filters/base-macro-filter/base-macro-filter.component';
import { AnalyticalReportComponent } from './analytical-report/analytical-report.component';


@NgModule({
  declarations: [
    LoadUnloadByMacroComponent,
    BaseCustomerFilterComponent,
    BaseUserFilterComponent,
    LoadUnloadByPointComponent,
    LoadUnloadByRadiusComponent,
    TripsLateComponent,
    TravelRequestsComponent,
    BaseGenericFiltersComponent,
    BaseGenericFiltersComponent,
    AvailableVehiclesComponent,
    LogisticsComponent,
    TravelStartComponent,
    BaseVehicleFilterComponent,
    TravelEndComponent,
    ClosingComponent,
    ScheduledTripsComponent,
    InsuranceCompaniesComponent,
    CommandsHistoryComponent,
    PositionsHistoryComponent,
    BaitsComponent,
    OperationalAuditCommandsComponent,
    OperationalAuditMessagesComponent,
    MacrovehicleComponent,
    BaseMacroFilterComponent,
    AnalyticalReportComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
