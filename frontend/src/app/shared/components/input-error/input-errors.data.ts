import {InputErrorModel} from "./input-error.model";

export const inputErrorsData:InputErrorModel[] = [
  {
    errorName: 'required',
    errorMessage: 'This field is required'
  },
  {
    errorName: 'maxlength',
    errorMessage: 'Too long'
  },
  {
    errorName: 'minlength',
    errorMessage: 'Too short',
  },
  {
    errorName: 'max',
    errorMessage: 'Too large'
  },
  {
    errorName: 'min',
    errorMessage: 'Too small'
  },
  {
    errorName: 'email',
    errorMessage: 'Invalid email address'
  },
  {
    errorName: 'password',
    errorMessage: 'Needs at least one uppercase letter'
  }
]
