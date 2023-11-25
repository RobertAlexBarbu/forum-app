import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AdminsPageComponent } from './pages/admins-page/admins-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        component: AdminsPageComponent
      },
      {
        path: 'statistics',
        component: StatisticsPageComponent
      }
    ]
  }
];
