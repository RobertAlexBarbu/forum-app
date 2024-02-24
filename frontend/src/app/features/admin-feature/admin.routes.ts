import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/admins-page/admins-page.component').then(
            (m) => m.AdminsPageComponent
          )
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('./pages/statistics-page/statistics-page.component').then(
            (m) => m.StatisticsPageComponent
          )
      }
    ]
  }
];
