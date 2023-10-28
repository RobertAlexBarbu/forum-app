import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {AuthStateModel} from "../../model/auth-state.model";
import {Observable} from "rxjs";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamAlignJustify} from "@ng-icons/jam-icons";
import {ButtonModule} from "primeng/button";
import {MenuComponent} from "../menu/menu.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIcon, ButtonModule, MenuComponent, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  viewProviders: [provideIcons({jamAlignJustify})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  store = inject(Store<AuthStateModel>)
  authState$!: Observable<AuthStateModel>;
  menuVisible = false;
  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }
  openMenu() {
    this.menuVisible = true;
  }
}
