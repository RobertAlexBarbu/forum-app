import {Routes} from "@angular/router";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ForumsPageComponent} from "./pages/forums-page/forums-page.component";
import {
  ForumPageComponent
} from "./pages/forum-page/forum-page.component";
import {isAdminGuard} from "../../core/guards/is-admin.guard";
import {ForumsFeatureComponent} from "./forums-feature.component";
import {
  NewPostPageComponent
} from "./pages/new-post-page/new-post-page.component";
import {PostPageComponent} from "./pages/post-page/post-page.component";
import {PostsComponent} from "./components/posts/posts.component";

export const forumsRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'forums',
    component: ForumsFeatureComponent,
    children: [
      {
        path: '',
        component: ForumsPageComponent
      },
      {
        path: 'new',
        // canMatch: [isAdminGuard],
        loadComponent: () => import("./pages/edit-forum-page/edit-forum-page.component").then(m => m.EditForumPageComponent)
      },
      {
        path: 'edit/:id',
        // canMatch: [isAdminGuard],
        loadComponent: () => import("./pages/edit-forum-page/edit-forum-page.component").then(m => m.EditForumPageComponent)
      },
      {
        path: ':id',
        component: ForumPageComponent,
        children: [
          {
            path: '',
            component: PostsComponent
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
      },


    ]
  }

]
