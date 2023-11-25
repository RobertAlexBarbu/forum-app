import {
  Directive,
  inject,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthStateModel } from '../../core/store/auth/auth-state.model';
import { AuthService } from '../../core/services/auth/auth.service';

@Directive({
  selector: '[isAdmin]',
  standalone: true
})
export class IsAdminDirective implements OnInit {
  private show = false;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef
  ) {}

  store = inject(Store<AuthStateModel>);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.displayTemplate();
    this.store.select('auth').subscribe({
      next: (data) => {
        this.show = this.authService.isAdmin(data);
        this.displayTemplate();
      }
    });
  }

  private displayTemplate() {
    this.vcr.clear();
    if (this.show) {
      this.vcr.createEmbeddedView(this.templateRef);
    }
  }
}
