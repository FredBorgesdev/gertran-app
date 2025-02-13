import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlateOutGridDetailsComponent } from "./plate-out-grid-details/plate-out-grid-details.component";

const routes: Routes = [
    {
        path: 'details',
        component: PlateOutGridDetailsComponent,
        data: {
            title: 'Placas fora do grid',
            headerDisplay: 'none'
        }
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlateOutGridRouting { }