import { Routes, RouterModule } from '@angular/router';

export const FullLayout_ROUTES: Routes = [
    {
        path: 'authentication',
        loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: 'print-report',
        loadChildren: () => import('../../monthly_report/monthly_report.module').then(m => m.MonthlyReportModule)
    }
];
