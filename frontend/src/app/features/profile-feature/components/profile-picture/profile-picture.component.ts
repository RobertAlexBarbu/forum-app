import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../../core/models/user.model';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { IsUserPipe } from '../../../../shared/pipes/is-user.pipe';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [CommonModule, FileUploadModule, IsUserPipe],
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePictureComponent implements OnInit, OnDestroy {
  @Input() user!: UserModel;

  @Input() authState!: AuthStateModel;

  destroy$ = new Subject<boolean>();

  profileService = inject(ProfileService);

  profilePictureUrl$ = new Subject<string>();

  ngOnInit() {
    this.profileService
      .getProfilePictureURL(this.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (url) => {
          this.profilePictureUrl$.next(url);
        }
      });
  }

  onUpload(event: FileUploadHandlerEvent) {
    for (const file of event.files) {
      this.profileService.uploadProfilePicture(file, this.user.id).then(() => {
        this.profilePictureUrl$.next(URL.createObjectURL(file));
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
