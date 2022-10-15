import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadUnloadByMacroComponent} from './load-unload-by-macro/load-unload-by-macro.component';
import {LoadUnloadByPointComponent} from './load-unload-by-point/load-unload-by-point.component';
import {LoadUnloadByRadiusComponent} from './load-unload-by-radius/load-unload-by-radius.component';
import {TripsLateComponent} from './trips-late/trips-late.component';

const routes: Routes = [
  {
    path: 'load-unload-by-macro',
    component: LoadUnloadByMacroComponent,
  },
  {
    path: 'load-unload-by-point',
    component: LoadUnloadByPointComponent,
  },
  {
    path: 'load-unload-by-radius',
    component: LoadUnloadByRadiusComponent,
  },
  {
    path: 'trips-late',
    component: TripsLateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
