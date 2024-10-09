import { NgModule } from "@angular/core";
import { MonitoringRequestHistory } from "./monitoring-request-history.component";
import { SharedModule } from "../shared/shared.module";
import { MonitoringRequestHistoryRoutingModule } from "./monitoring-request-history-routing.module";

@NgModule({
    declarations: [MonitoringRequestHistory],
    imports:[
        SharedModule,
        MonitoringRequestHistoryRoutingModule
    ]
})

export class MonitoringRequestHistoryModule {}