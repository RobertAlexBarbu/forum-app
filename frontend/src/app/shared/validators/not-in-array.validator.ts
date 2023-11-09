import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const notInArrayValidator = (array: Array<any>) => {
  const validator: ValidatorFn = (control: AbstractControl) => {
    if (array.findIndex(control.value)) {
      const errors: ValidationErrors = {
        inArray: true
      }
      return errors;

    } else {
      return null;
    }
  }
}
