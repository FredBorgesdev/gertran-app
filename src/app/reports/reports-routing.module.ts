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
import {CommandsHistoryComponent} from './commands-history/commands-history.component';
import {PositionsHistoryComponent} from './positions-history/positions-history.component';
import {BaitsComponent} from './baits/baits.component';
import {OperationalAuditCommandsComponent} from './operational-audit-commands/operational-audit-commands.component';
import {OperationalAuditMessagesComponent} from './operational-audit-messages/operational-audit-messages.component';
import {MacrovehicleComponent} from './macrovehicle/macrovehicle.component';
import {AnalyticalReportComponent} from './analytical-report/analytical-report.component';

const routes: Routes = [
  { path: 'load-unload-by-macro', component: LoadUnloadByMacroComponent },
  { path: 'load-unload-by-point', component: LoadUnloadByPointComponent },
  { path: 'load-unload-by-radius', component: LoadUnloadByRadiusComponent },
  { path: 'trips-late', component: TripsLateComponent },
  { path: 'travel-requests', component: TravelRequestsComponent },
  { path: 'available-vehicles', component: AvailableVehiclesComponent },
  { path: 'logistics', component: LogisticsComponent },
  { path: 'travel-start', component: TravelStartComponent },
  { path: 'travel-end', component: TravelEndComponent },
  { path: 'closing', component: ClosingComponent },
  { path: 'scheduled-trips', component: ScheduledTripsComponent },
  { path: 'insurance-companies', component: InsuranceCompaniesComponent },
  { path: 'commands-history', component: CommandsHistoryComponent },
  { path: 'positions-history', component: PositionsHistoryComponent },
  { path: 'baits', component: BaitsComponent },
  { path: 'operational-audit-commands', component: OperationalAuditCommandsComponent },
  { path: 'operational-audit-messages', component: OperationalAuditMessagesComponent },
  { path: 'macro-vehicle', component: MacrovehicleComponent },
  { path: 'analytical', component: AnalyticalReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
