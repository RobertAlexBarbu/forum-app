import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AuthService } from './core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { isAuth } from './core/store/auth/auth.actions';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'forum-app';
  check$ = new Subject<boolean>();
  authService = inject(AuthService);
  store = inject(Store);
  router = inject(Router);
  ngOnInit() {
    this.authService.checkAuth().subscribe({
      next: (data) => {
        this.check$.next(true);
        this.store.dispatch(isAuth({ authState: data }));
      },
      error: () => {
        this.check$.next(true);
      }
    });
  }
}
