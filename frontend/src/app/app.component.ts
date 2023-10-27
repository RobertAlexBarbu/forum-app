import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./core/components/navbar/navbar.component";
import {AuthService} from "./core/services/auth/auth.service";
import {Store} from "@ngrx/store";
import {isAuth} from "./core/store/auth/auth.actions";
import {HeaderComponent} from "./core/components/header/header.component";
import {FooterComponent} from "./core/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'forum-app';
  authService = inject(AuthService);
  store = inject(Store);

  ngOnInit() {

    this.authService.checkAuth().subscribe({
      next: (data) => {
        if (data !== false) {
          this.store.dispatch(isAuth({sessionData: data}))
        }
      }
    })


  }
}
