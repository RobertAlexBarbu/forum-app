import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamClose } from '@ng-icons/jam-icons';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ButtonModule, NgIcon, NavbarComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  viewProviders: [provideIcons({ jamClose })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  private _visible = false;
  renderer2 = inject(Renderer2);
  document = inject(DOCUMENT);
  @Output() isVisibleChange = new EventEmitter();
  @Input()
  set isVisible(value: boolean) {
    const menu = document.querySelector('.hamburger-menu');
    if (value) {
      this.document.body.style.overflow = 'hidden';

      if (menu !== null) {
        (menu as HTMLElement).style.display = 'block';
      }
      this.renderer2.addClass(
        document.querySelector('.hamburger-menu'),
        'hamburger-menu-active'
      );
      this.renderer2.removeClass(
        document.querySelector('.hamburger-menu'),
        'hamburger-menu-closed'
      );
    } else {
      this.document.body.style.overflow = '';
      this.renderer2.addClass(
        document.querySelector('.hamburger-menu'),
        'hamburger-menu-closed'
      );
      this.renderer2.removeClass(
        document.querySelector('.hamburger-menu'),
        'hamburger-menu-active'
      );
      setTimeout(() => {
        if (menu !== null) {
          (menu as HTMLElement).style.display = 'none';
        }
      }, 170);
      this.isVisibleChange.emit(false);
    }
    this._visible = value;
  }
  closeMenu() {
    this.isVisible = false;
  }
}
