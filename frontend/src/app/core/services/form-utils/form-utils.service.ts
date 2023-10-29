import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }
  markGroupDirty(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      form.get(key)!.markAsDirty();
    });
  }
}
