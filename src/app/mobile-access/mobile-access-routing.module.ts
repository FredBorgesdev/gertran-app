import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileAccessFormComponent } from './mobile-access-form/mobile-access-form.component';
import { MobileAccessListComponent } from './mobile-access-list/mobile-access-list.component';

const routes: Routes = [
  {
    path: 'mobile-access-list',
    component: MobileAccessListComponent,
    data: {
      title: 'MobileAccess List',
      headerDisplay: 'none',
    }
  },
  {
    path: 'mobile-access-create',
    component: MobileAccessFormComponent,
    data: {
      title: 'Criar MobileAccess',
      headerDisplay: 'none',
    }
  },
  {
    path: 'mobile-access-edit/:id',
    component: MobileAccessFormComponent,
    data: {
      title: 'Editar MobileAccess',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileAccessRoutingModule { }
