import { RouterModule, Routes } from "@angular/router";
import { MonitoringRequestHistory } from "./monitoring-request-history.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'monitoring-request-history',
        component: MonitoringRequestHistory,
        data: {
            title: 'Histórico SM',
            headerDisplay: 'none'
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MonitoringRequestHistoryRoutingModule{}