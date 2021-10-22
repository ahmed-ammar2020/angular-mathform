import { AbstractControl } from "@angular/forms";

export class MathValidator {
  static addition(firstValue: string, secondValue: string, result: string) {
    return (form: AbstractControl) => {

      const num1 = form.value[firstValue];
      const num2 = form.value[secondValue];;
      const res = form.value[result];

      if (num1 + num2 === +res) {
        return null;
      }

      return { addition: true }
    }
  }
}
