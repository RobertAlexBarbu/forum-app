import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpService} from "../../../../core/services/http/http.service";
import {UserModel} from "../../models/user.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent implements  OnInit{
  httpService = inject(HttpService);
  users$ = new Subject<UserModel[]>()
  ngOnInit() {
    console.log('test');
    this.httpService.get<UserModel[]>('users').subscribe({
      next: (data) => {
        console.log('test');
        console.log(data);
        this.users$.next(data);
      }
    })
  }
}
