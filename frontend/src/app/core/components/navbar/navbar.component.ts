import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  inject,
  OnInit, Output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {logout} from "../../store/auth/auth.actions";
import {isAuthPipe} from "../../../shared/pipes/is-auth.pipe";
import {isAdminPipe} from "../../../shared/pipes/is-admin.pipe";
import {AuthStateModel} from "../../store/auth/auth-state.model";
import {ButtonModule} from "primeng/button";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamHomeF, jamMessagesF, jamPieChartF} from "@ng-icons/jam-icons";
import {IsAuthDirective} from "../../../shared/directives/is-auth.directive";
import {IsAdminDirective} from "../../../shared/directives/is-admin.directive";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, isAuthPipe, isAdminPipe, ButtonModule, NgIcon, RouterLinkActive, IsAuthDirective, IsAdminDirective],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({jamHomeF, jamMessagesF, jamPieChartF})]
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
    this.authService.logout();
    this.store.dispatch(logout());
    this.router.navigate([''])
  }

}
