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
  {
    path: 'load-unload-by-macro',
    component: LoadUnloadByMacroComponent,
    data: {
      permission: 'reports.view_load_and_unload_report'
    }
  },
  {
    path: 'load-unload-by-point',
    component: LoadUnloadByPointComponent,
    data: {
      permission: 'reports.view_load_and_unload_by_point_report'
    }
  },
  {
    path: 'load-unload-by-radius',
    component: LoadUnloadByRadiusComponent
  },
  {
    path: 'trips-late',
    component: TripsLateComponent,
    data: {
      permission: 'reports.view_delayed_trips_report'
    }
  },
  {
    path: 'travel-requests',
    component: TravelRequestsComponent,
    data: {
      permission: 'reports.view_monitoring_request_report'
    }
  },
  {
    path: 'available-vehicles',
    component: AvailableVehiclesComponent,
    data: {
      permission: 'reports.view_vehicles_relesed_report'
    }
  },
  {
    path: 'logistics',
    component: LogisticsComponent,
    data: {
      permission: 'reports.view_logistic_report'
    }
  },
  {
    path: 'travel-start',
    component: TravelStartComponent,
    data: {
      permission: 'reports.view_travel_start_report'
    }
  },
  {
    path: 'travel-end',
    component: TravelEndComponent,
    data: {
      permission: 'reports.view_travel_end_report'
    }
  },
  {
    path: 'closing',
    component: ClosingComponent
  },
  {
    path: 'scheduled-trips',
    component: ScheduledTripsComponent
  },
  {
    path: 'insurance-companies',
    component: InsuranceCompaniesComponent
  },
  {
    path: 'commands-history',
    component: CommandsHistoryComponent,
    data: {
      permission: 'reports.view_command_history_report'
    }
  },
  {
    path: 'positions-history',
    component: PositionsHistoryComponent
  },
  {
    path: 'baits',
    component: BaitsComponent
  },
  {
    path: 'operational-audit-commands',
    component: OperationalAuditCommandsComponent,
    data: {
      permission: 'reports.view_commands_operational_audit_history_report'
    }
  },
  {
    path: 'operational-audit-messages',
    component: OperationalAuditMessagesComponent,
    data: {
      permission: 'reports.view_messages_operational_audit_history_report'
    }
  },
  {
    path: 'macro-vehicle',
    component: MacrovehicleComponent,
    data: {
      permission: 'reports.view_macro_vehicle_report'
    }
  },
  {
    path: 'analytical',
    component: AnalyticalReportComponent,
    data: {
      permission: 'reports.view_analytical_report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
