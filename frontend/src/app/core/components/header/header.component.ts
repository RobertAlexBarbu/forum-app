import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {isAuthPipe} from "../../../shared/pipes/is-auth.pipe";
import {Store} from "@ngrx/store";
import {AuthStateModel} from "../../model/auth-state.model";
import {AuthService} from "../../services/auth/auth.service";
import {Observable} from "rxjs";
import {logout} from "../../store/auth/auth.actions";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamAlignJustify} from "@ng-icons/jam-icons";
import {ButtonModule} from "primeng/button";
import {MenuComponent} from "../menu/menu.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, isAuthPipe, NgIcon, ButtonModule, MenuComponent, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [provideIcons({jamAlignJustify})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  store = inject(Store<AuthStateModel>)
  authState$!: Observable<AuthStateModel>;
  authService = inject(AuthService);
  router = inject(Router);
  menuVisible = false;
  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  openMenu() {
    console.log('menu pressede');
    this.menuVisible = true;
  }
}
