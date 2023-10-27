import {inject, Pipe, PipeTransform} from "@angular/core";
import {AuthService} from "../../core/services/auth/auth.service";
import {AuthStateModel} from "../../core/model/auth-state.model";



@Pipe({
  name: 'isModerator',
  pure: true,
  standalone: true
})
export class isModeratorPipe implements PipeTransform {
  authService = inject(AuthService);
  transform(value: AuthStateModel): boolean {
    return this.authService.isModerator(value);
  }
}
