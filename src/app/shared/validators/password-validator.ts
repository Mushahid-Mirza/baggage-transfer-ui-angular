// import { ErrorStateMatcher } from '@angular/material/error';

import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return (control && control.parent.get('Password').value !== control.parent.get('RepeatPassword').value && control.dirty)
    }
}
export function RepeatPasswordValidator(group: FormGroup) {
    let password = group.controls.Password.value;
    let passwordConfirmation = group.controls.RepeatPassword.value;

    return password === passwordConfirmation ? null : { passwordsNotEqual: true }
}