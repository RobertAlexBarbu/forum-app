import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import {
  FileUploadModule
} from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { ProfileModel } from '../../models/profile.model';
import { PostComponent } from '../../../forums-feature/components/post/post.component';
import { Store } from '@ngrx/store';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamCameraF } from '@ng-icons/jam-icons';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ProfilePictureComponent } from '../../components/profile-picture/profile-picture.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadModule,
    PostComponent,
    NgIcon,
    TimeAgoPipe,
    ModalComponent,
    ProfilePictureComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamCameraF })]
})
export class ProfilePageComponent implements OnInit {
  profileService = inject(ProfileService);

  route = inject(ActivatedRoute);

  profile$!: Observable<ProfileModel>;

  authState$: Observable<AuthStateModel> = inject(Store).select('auth');


  ngOnInit() {
    this.profile$ = this.profileService.getProfile(
      this.route.snapshot.params['username']
    );
  }
}
