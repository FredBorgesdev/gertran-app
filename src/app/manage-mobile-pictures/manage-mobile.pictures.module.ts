import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ManageMobilePicturesRoutingModule } from "./manage-mobile-pictures-routing.module";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ManageMobilePicturesComponent } from "./manage-mobile-pictures.component";

@NgModule({
    declarations:[ManageMobilePicturesComponent],
    imports:[
        SharedModule,
        ManageMobilePicturesRoutingModule,
    ],
    exports:[
    ]
})

export class ManageMobilePicturesModule {}