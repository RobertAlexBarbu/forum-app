import {
  ChangeDetectionStrategy,
  Component,
  inject, Input,
  OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable, skip} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {logout} from "../../store/auth/auth.actions";
import {isAuthPipe} from "../../../shared/pipes/is-auth.pipe";
import {isModeratorPipe} from "../../../shared/pipes/is-moderator.pipe";
import {isAdminPipe} from "../../../shared/pipes/is-admin.pipe";
import {AuthStateModel} from "../../model/auth-state.model";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, isAuthPipe, isModeratorPipe, isAdminPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  store = inject(Store<AuthStateModel>)
  authService = inject(AuthService);
  authState$!: Observable<AuthStateModel>;
  router = inject(Router);

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.store.dispatch(logout())
        return this.router.navigate(['']);
      }
    })
  }
}
