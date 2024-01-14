import { Routes } from '@angular/router';
import { isAdminGuard } from '../../core/guards/is-admin.guard';
import { isAuthGuard } from '../../core/guards/is-auth.guard';

export const forumsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'forums',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/forums-page/forums-page.component').then(m => m.ForumsPageComponent)
      },
      {
        path: 'edit/:id',
        canMatch: [isAdminGuard],
        loadComponent: () =>
          import('./pages/edit-forum-page/edit-forum-page.component').then(
            (m) => m.EditForumPageComponent
          )
      },
      {
        path: ':id/posts/edit/:post',
        canMatch: [isAuthGuard],
        loadComponent: () =>
          import('./pages/edit-post-page/edit-post-page.component').then(
            (m) => m.EditPostPageComponent
          )
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/forum-page/forum-page.component').then(m => m.ForumPageComponent),
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/posts-page/posts-page.component').then(m => m.PostsPageComponent)
          },

          {
            path: 'posts/:post',
            loadComponent: () => import('./pages/post-page/post-page.component').then(m => m.PostPageComponent)
          }
        ]
      },
      {
        path: ':id/new-post',
        canMatch: [isAuthGuard],
        loadComponent: () =>
          import('./pages/new-post-page/new-post-page.component').then(
            (m) => m.NewPostPageComponent
          )
      }
    ]
  }
];
