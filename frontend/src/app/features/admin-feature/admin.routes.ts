import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AdminService } from './services/admin/admin.service';
import { ColorService } from './services/color/color.service';

export const adminRoutes: Routes = [
  {
    path: '',
    providers: [AdminService, ColorService],
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admins-page/admins-page.component').then(m => m.AdminsPageComponent)
      },
      {
        path: 'statistics',
        loadComponent: () => import('./pages/statistics-page/statistics-page.component').then(m => m.StatisticsPageComponent)
      }
    ]
  }
];
