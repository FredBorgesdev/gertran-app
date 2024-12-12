import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GertranDirectFormComponent } from "./gertran-direct-form/gertran-direct-form.component";
import { GertranDirectApprovalComponent } from "./gertran-direct-approval/gertran-direct-approval.component";
import { GertranDirectDetailsComponent } from "./gertran-direct-details/gertran-direct-details.component";

const routes: Routes = [
    {
        path: 'create',
        component: GertranDirectFormComponent,
        data: {
            title: 'Gertran Direto',
            headerDisplay: 'none'
        }
    },
    {
        path: 'edit/:id',
        component: GertranDirectFormComponent,
        data: {
            title: 'Gertran Direto',
            headerDisplay: 'none'
        }
    },
    {
        path: 'details/:id',
        component: GertranDirectDetailsComponent,
        data: {
            title: 'Gertran Direto Aprovação',
            headerDisplay: 'none'
        }
    },
    {
        path: 'approval',
        component: GertranDirectApprovalComponent,
        data: {
            title: 'Gertran Direto Aprovação',
            headerDisplay: 'none'
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GertranDirectRouting { }