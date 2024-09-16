import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportsRoutingModule} from './reports-routing.module';
import {LoadUnloadByMacroComponent} from './load-unload-by-macro/load-unload-by-macro.component';
import {SharedModule} from '../shared/shared.module';
import {BaseCustomerFilterComponent} from './filters/base-customer-filter/base-customer-filter.component';
import {LoadUnloadByPointComponent} from './load-unload-by-point/load-unload-by-point.component';
import {LoadUnloadByRadiusComponent} from './load-unload-by-radius/load-unload-by-radius.component';
import {TripsLateComponent} from './trips-late/trips-late.component';
import {TravelRequestsComponent} from './travel-requests/travel-requests.component';
import {BaseGenericFiltersComponent} from './filters/base-generic-filters/base-generic-filters.component';
import {AvailableVehiclesComponent} from './available-vehicles/available-vehicles.component';
import {LogisticsComponent} from './logistics/logistics.component';
import {TravelStartComponent} from './travel-start/travel-start.component';
import {BaseVehicleFilterComponent} from './filters/base-vehicle-filter/base-vehicle-filter.component';
import {TravelEndComponent} from './travel-end/travel-end.component';
import {ClosingComponent} from './closing/closing.component';
import {ScheduledTripsComponent} from './scheduled-trips/scheduled-trips.component';
import {InsuranceCompaniesComponent} from './insurance-companies/insurance-companies.component';
import {CommandsHistoryComponent} from './commands-history/commands-history.component';
import {PositionsHistoryComponent} from './positions-history/positions-history.component';
import {BaitsComponent} from './baits/baits.component';
import {OperationalAuditCommandsComponent} from './operational-audit-commands/operational-audit-commands.component';
import {BaseUserFilterComponent} from './filters/base-user-filter/base-user-filter.component';
import {OperationalAuditMessagesComponent} from './operational-audit-messages/operational-audit-messages.component';
import {MacrovehicleComponent} from './macrovehicle/macrovehicle.component';
import {BaseMacroFilterComponent} from './filters/base-macro-filter/base-macro-filter.component';
import {AnalyticalReportComponent} from './analytical-report/analytical-report.component';
import {ChecklistHistoryComponent} from './checklist-history/checklist-history.component';
import {WorkdayComponent} from './workday/workday.component';
import {BaseWorkdayFilterComponent} from './filters/base-workday-filter/base-workday-filter.component';
import {BaseWorkdayEmployedFilterComponent} from './filters/base-workday-employed-filter/base-workday-employed-filter.component';
import {TextMaskModule} from 'angular2-text-mask';
import {WorkdayJustificationComponent} from './extra/workday-justification/workday-justification.component';
import {LogisticReportComponent} from './logistic-report/logistic-report.component';
import {NgChartsModule} from 'ng2-charts';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {environment} from '../../environments/environment';
import {SimpleHourPipe} from './pipes/simple-hour.pipe';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {MapMarkersModalComponent} from './extra/map-markers-modal/map-markers-modal.component';
import {FatigueReportComponent} from './fatigue-report/fatigue-report.component';
import {MonitoringRequestsComponent} from './dashboards/monitoring-requests/monitoring-requests.component';
import {MonitoringRequestsModule} from "../monitoring-requests/monitoring-requests.module";
import {ChecklistsComponent} from './dashboards/checklists/checklists.component';
import {IncidentsComponent} from './incidents/incidents.component';
import {BaseClosingFilterComponent} from "./filters/base-closing-filter/base-closing-filter.component";
import {PanicHistoryComponent} from "./panic-history/panic-history.component";
import {AlertsComponent as DashboardAlertsComponent} from './dashboards/alerts/alerts.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {AlertsComponent} from "./alerts/alerts.component";
import {DashboardMapsComponent} from "./dashboards/maps/maps.component";
import {ClientComponent} from './dashboards/client/client.component';
import {ControlTower1} from './dashboards/tc1/tc1.component';
import {ControlTower2} from './dashboards/tc2/tc2.component';
import {ControlTowerGertran} from './dashboards/tc-gertran/tc-gertran.component';
import {ControlTower3} from './dashboards/tc3/tc3.component';
import {ControlTower4} from './dashboards/tc4/client.component';
import {ControlTower5} from './dashboards/tc5/client.component';
import {TechnologiesComponent} from './technologies/technologies.component';
import {GridComponent} from "./dashboards/grid/grid.component";
import {Tv1Component} from './dashboards/tv1/tv1.component';
import {ReleaseIntervalComponent} from "./dashboards/release-interval/release-interval.component";
import {ClientChecklistsComponent} from "./dashboards/client-checklists/client-checklists.component";
import {
  ClientMonitoringRequestsComponent
} from "./dashboards/client-monitoring-requests/client-monitoring-requests.component";
import { InsuranceComponent } from './insurance/insurance.component';
import { FixedButtonsComponent } from '../shared/fixed-buttons/fixed-buttons.component';
import { WorkdayEmployedComponent } from './workday-employed/workday-employed.component';

@NgModule({
  declarations: [
    LoadUnloadByMacroComponent,
    BaseCustomerFilterComponent,
    BaseClosingFilterComponent,
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
    ChecklistHistoryComponent,
    WorkdayComponent,
    WorkdayEmployedComponent,
    BaseWorkdayFilterComponent,
    BaseWorkdayEmployedFilterComponent,
    WorkdayJustificationComponent,
    LogisticReportComponent,
    SimpleHourPipe,
    MapMarkersModalComponent,
    FatigueReportComponent,
    MonitoringRequestsComponent,
    ChecklistsComponent,
    IncidentsComponent,
    PanicHistoryComponent,
    DashboardAlertsComponent,
    AlertsComponent,
    DashboardMapsComponent,
    ClientComponent,
    ControlTower1,
    ControlTower2,
    ControlTower3,
    ControlTower4,
    ControlTower5,
    TechnologiesComponent,
    GridComponent,
    ReleaseIntervalComponent,
    Tv1Component,
    ClientChecklistsComponent,
    ClientMonitoringRequestsComponent,
    InsuranceComponent,
    ControlTowerGertran,
    FixedButtonsComponent
  ],
  exports: [
    WorkdayComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReportsRoutingModule,
    TextMaskModule,
    NgChartsModule,
    NzStatisticModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxAccessToken,
    }),
    NzTypographyModule,
    MonitoringRequestsModule,
    NzPageHeaderModule,
  ]
})
export class ReportsModule {
}
