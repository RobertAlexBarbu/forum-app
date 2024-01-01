import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ForumsPageComponent } from './pages/forums-page/forums-page.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { NewPostPageComponent } from './pages/new-post-page/new-post-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { EditPostPageComponent } from './pages/edit-post-page/edit-post-page.component';
import {isAdminGuard} from "../../core/guards/is-admin.guard";

export const forumsRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'forums',
    children: [
      {
        path: '',
        component: ForumsPageComponent
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
        component: EditPostPageComponent
      },
      {
        path: ':id',
        component: ForumPageComponent,
        children: [
          {
            path: '',
            component: PostsPageComponent
          },

          {
            path: 'posts/:post',
            component: PostPageComponent
          }
        ]
      },
      {
        path: ':id/new-post',
        component: NewPostPageComponent
      }
    ]
  }
];
