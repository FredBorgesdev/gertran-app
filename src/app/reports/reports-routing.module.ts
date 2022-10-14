import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadUnloadByMacroComponent} from './load-unload-by-macro/load-unload-by-macro.component';

const routes: Routes = [
  {
    path: 'load-unload-by-macro',
    component: LoadUnloadByMacroComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
