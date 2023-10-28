import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  inject,
  OnInit, Output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable, skip} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {logout} from "../../store/auth/auth.actions";
import {isAuthPipe} from "../../../shared/pipes/is-auth.pipe";
import {isModeratorPipe} from "../../../shared/pipes/is-moderator.pipe";
import {isAdminPipe} from "../../../shared/pipes/is-admin.pipe";
import {AuthStateModel} from "../../model/auth-state.model";
import {ButtonModule} from "primeng/button";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamHomeF, jamMessagesF} from "@ng-icons/jam-icons";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, isAuthPipe, isModeratorPipe, isAdminPipe, ButtonModule, NgIcon, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({jamHomeF, jamMessagesF})]
})
export class NavbarComponent implements OnInit {
  store = inject(Store<AuthStateModel>)
  authService = inject(AuthService);
  authState$!: Observable<AuthStateModel>;
  router = inject(Router);
  @Output() navigate = new EventEmitter();

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }
  closeMenu() {
    this.navigate.emit();
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.navigate.emit();
        this.store.dispatch(logout());
        return this.router.navigate(['']);
      }
    })
  }

}
