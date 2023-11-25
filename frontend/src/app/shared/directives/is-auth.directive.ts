import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthStateModel } from '../../core/store/auth/auth-state.model';

@Directive({
  selector: '[isAuth]',
  standalone: true
})
export class IsAuthDirective implements OnInit {
  private show = false;
  @Input() isAuth!: boolean;
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
        this.show = this.authService.isAuth(data);
        this.displayTemplate();
      }
    });
  }

  private displayTemplate() {
    this.vcr.clear();
    if (this.isAuth) {
      if (this.show) {
        this.vcr.createEmbeddedView(this.templateRef);
      }
    } else {
      if (!this.show) {
        this.vcr.createEmbeddedView(this.templateRef);
      }
    }
  }
}
