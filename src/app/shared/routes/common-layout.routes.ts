import { Routes } from '@angular/router';

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
  },
  {
    path: 'routes',
    loadChildren: () => import('../../routes/routes.module').then(m => m.RoutesModule)
  },
  {
    path: 'insurance-companies',
    loadChildren: () => import('../../insurance-companies/insurance-companies.module').then(m => m.InsuranceCompaniesModule)
  },
  {
    path: 'document-types',
    loadChildren: () => import('../../document-types/document-types.module').then(m => m.DocumentTypesModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('../../groups/groups.module').then(m => m.GroupsModule)
  },
  {
    path: 'tracker-technologies',
    loadChildren: () => import('../../tracker-technologies/tracker-technologies.module').then(m => m.TrackerTechnologiesModule)
  },
  {
    path: 'vehicle-manufacturers',
    loadChildren: () => import('../../vehicle-manufacturers/vehicle-manufacturers.module').then(m => m.VehicleManufacturersModule)
  },
  {
    path: 'vehicle-model-types',
    loadChildren: () => import('../../vehicle-model-types/vehicle-model-types.module').then(m => m.VehicleModelTypesModule)
  },
  {
    path: 'vehicle-peripherals',
    loadChildren: () => import('../../vehicle-peripherals/vehicle-peripherals.module').then(m => m.VehiclePeripheralsModule)
  },
  {
    path: 'monitoring',
    loadChildren: () => import('../../monitoring/monitoring.module').then(m => m.MonitoringModule)
  }
];
