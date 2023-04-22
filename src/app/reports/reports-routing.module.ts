import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {Permissions} from '../authentication/permissions';
import {ChecklistHistoryComponent} from './checklist-history/checklist-history.component';
import {WorkdayComponent} from './workday/workday.component';
import {LogisticReportComponent} from './logistic-report/logistic-report.component';
import {FatigueReportComponent} from './fatigue-report/fatigue-report.component';
import {MonitoringRequestsComponent} from "./dashboards/monitoring-requests/monitoring-requests.component";
import {ChecklistsComponent} from "./dashboards/checklists/checklists.component";

const routes: Routes = [
  {
    path: 'load-unload-by-macro',
    component: LoadUnloadByMacroComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_LOAD_AND_UNLOAD_REPORT
    }
  },
  {
    path: 'load-unload-by-point',
    component: LoadUnloadByPointComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_LOAD_AND_UNLOAD_BY_POINT_REPORT
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
      permission: Permissions.REPORTS_VIEW_DELAYED_TRIPS_REPORT
    }
  },
  {
    path: 'travel-requests',
    component: TravelRequestsComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_MONITORING_REQUEST_REPORT
    }
  },
  {
    path: 'available-vehicles',
    component: AvailableVehiclesComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_VEHICLES_RELESED_REPORT
    }
  },
  {
    path: 'logistics',
    component: LogisticsComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_LOGISTIC_REPORT
    }
  },
  {
    path: 'travel-start',
    component: TravelStartComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_TRAVEL_START_REPORT
    }
  },
  {
    path: 'travel-end',
    component: TravelEndComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_TRAVEL_END_REPORT
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
      permission: Permissions.REPORTS_VIEW_COMMANDS_HISTORY_REPORT
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
      permission: Permissions.REPORTS_VIEW_MESSAGES_OPERATIONAL_AUDIT_HISTORY_REPORT
    }
  },
  {
    path: 'operational-audit-messages',
    component: OperationalAuditMessagesComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_MESSAGES_OPERATIONAL_AUDIT_HISTORY_REPORT
    }
  },
  {
    path: 'macro-vehicle',
    component: MacrovehicleComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_MACRO_VEHICLE_REPORT
    }
  },
  {
    path: 'analytical',
    component: AnalyticalReportComponent,
    data: {
      permission: Permissions.REPORTS_VIEW_ANALYTICAL_REPORT
    }
  },
  {
    path: 'checklist-history',
    component: ChecklistHistoryComponent,
  },
  {
    path: 'workday',
    component: WorkdayComponent,
  },
  {
    path: 'logisticreport',
    component: LogisticReportComponent
  },
  {
    path: 'fatiguereport',
    component: FatigueReportComponent,
  },
  {
    path: 'dashboards/monitoring-requests',
    component: MonitoringRequestsComponent,
  },
  {
    path: 'dashboards/checklists',
    component: ChecklistsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {
}
