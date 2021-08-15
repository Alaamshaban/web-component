import { AbstractControl } from '@angular/forms';

export function isUri(control: AbstractControl) {
  const pattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
  return control.value === '' ||
    pattern.test(control.value) !== false ? null : {invalidUri: true};
}

