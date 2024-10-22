import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClosingCustomerSpreadSheetGeneratorComponent } from './closing-customers-spreadsheet-generator/closing-customers-spreadsheet-generator.component';

const routes: Routes = [
  {
    path: 'closing',
    component: ClosingCustomerSpreadSheetGeneratorComponent,
    data: {
      title: 'Pontos ',
      headerDisplay: 'none',
      // permission: Permissions.SETTINGS_VIEW_POINT,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosingCustomerRoutingModule { }
