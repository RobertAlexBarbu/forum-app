import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  inject, Input, Output,
  Renderer2
} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {
  NavbarComponent
} from "../../../core/components/navbar/navbar.component";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamClose} from "@ng-icons/jam-icons";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule, NavbarComponent, NgIcon],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  viewProviders: [provideIcons({jamClose})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  private _visible: boolean = false;
  renderer2 = inject(Renderer2);
  document = inject(DOCUMENT);
  @Output() isVisibleChange = new EventEmitter();
  @Input()
  set isVisible(value: boolean) {
    console.log('openend');
    const menu = document.querySelector('.hamburger-menu1');
    if(value) {
      this.document.body.style.overflow = 'hidden';

      if(menu !== null) {
        (menu as HTMLElement).style.display = 'flex';
      }
      this.renderer2.addClass(document.querySelector('.hamburger-menu1'), 'hamburger-menu-active')
      this.renderer2.removeClass(document.querySelector('.hamburger-menu1'), 'hamburger-menu-closed');
    } else {
      this.document.body.style.overflow = '';
      this.renderer2.addClass(document.querySelector('.hamburger-menu1'), 'hamburger-menu-closed')
      this.renderer2.removeClass(document.querySelector('.hamburger-menu1'), 'hamburger-menu-active');
      setTimeout(() => {

        if(menu !== null) {
          (menu as HTMLElement).style.display = 'none';
        }
      }, 170)
      this.isVisibleChange.emit(false);
    }
    this._visible = value;
  }
  closeMenu() {
    console.log('closed');
    this.isVisible = false;
  }
}
