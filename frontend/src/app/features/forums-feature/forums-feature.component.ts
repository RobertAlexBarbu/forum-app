import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-forums-feature',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './forums-feature.component.html',
  styleUrls: ['./forums-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumsFeatureComponent {

}
