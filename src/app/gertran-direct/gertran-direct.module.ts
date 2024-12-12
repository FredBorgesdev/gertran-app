import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { GertranDirectRouting } from "./gertran-direct-routing";
import { GertranDirectApprovalComponent } from "./gertran-direct-approval/gertran-direct-approval.component";
import { NzSpinModule } from 'ng-zorro-antd/spin'; 
import { GertranDirectFormComponent } from "./gertran-direct-form/gertran-direct-form.component";
import { GertranDirectDetailsComponent } from "./gertran-direct-details/gertran-direct-details.component";

@NgModule({
    declarations:[
        GertranDirectApprovalComponent,
        GertranDirectFormComponent,
        GertranDirectDetailsComponent,
    ],
    imports: [
        SharedModule,
        GertranDirectRouting,
        NzSpinModule
    ],
    exports: []
})

export class GertranDirectModule {}

// {
//     path: 'gertran-direct',
//     loadChildren: () => import('../../gertran-direct/gertran-direct.module').then(m=>m.GertranDirectModule)
//   }