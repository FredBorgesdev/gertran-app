import { RouterModule, Routes } from "@angular/router";
import { ManageMobilePicturesComponent } from "./manage-mobile-pictures.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'mobile-protocol-list',
        component: ManageMobilePicturesComponent,
        data: {
            title: 'Protocolos',
            headerDisplay: 'none'
        }
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ManageMobilePicturesRoutingModule {}