import {Routes} from "@angular/router";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ForumsPageComponent} from "./pages/forums-page/forums-page.component";
import {
  OneForumPageComponent
} from "./pages/one-forum-page/one-forum-page.component";
import {isAdminGuard} from "../../core/guards/is-admin.guard";
import {ForumsFeatureComponent} from "./forums-feature.component";

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
        path: 'edit',
        // canMatch: [isAdminGuard],
        loadComponent: () => import("./pages/edit-forum-page/edit-forum-page.component").then(m => m.EditForumPageComponent)
      },
      {
        path: ':name',
        component: OneForumPageComponent
      },

    ]
  }

]
