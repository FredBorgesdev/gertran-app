import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PlateOutGridRouting } from "./plate-out-grid-routing";
import { NzSpinModule } from 'ng-zorro-antd/spin'; 
import { PlateOutGridDetailsComponent } from "./plate-out-grid-details/plate-out-grid-details.component";

@NgModule({
    declarations:[
        PlateOutGridDetailsComponent,
    ],
    imports: [
        SharedModule,
        PlateOutGridRouting,
        NzSpinModule
    ],
    exports: []
})

export class PlateOutGridModule {}