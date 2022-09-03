import { Routes } from '@angular/router'

export const CommonLayout_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('../../customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'drivers',
    loadChildren: () => import('../../drivers/drivers.module').then(m => m.DriversModule)
  },
  {
    path: 'trucks',
    loadChildren: () => import('../../trucks/trucks.module').then(m => m.TrucksModule)
  },
  {
    path: 'wagons',
    loadChildren: () => import('../../wagons/wagons.module').then(m => m.WagonsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'automations',
    loadChildren: () => import('../../automations/automations.module').then(m => m.AutomationsModule)
  },
  {
    path: 'stops',
    loadChildren: () => import('../../stops/stops.module').then(m => m.StopsModule)
  }
]
