import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {
  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  getFieldErrorMessage(formGroup: FormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName) as FormControl;
    return this.getErrorMessageFromField(field);
  }

  getFieldFormArrayErrorMessage(
    formGroup: FormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return this.getErrorMessageFromField(
      formArray.controls[index].get(fieldName) as UntypedFormControl
    );
  }

  getErrorMessageFromField(field: UntypedFormControl): string {
    if (field?.hasError('required')) {
      return 'Không được để trống';
    }

    if (field?.hasError('maxlength') && field.errors) {
      const requiredLength = field.errors['maxlength']['requiredLength'];
      return `Tối đa ${requiredLength} ký tự.`;
    }

    if (field?.hasError('minlength') && field.errors) {
      const requiredLength = field.errors['minlength']['requiredLength'];
      return `Tối thiểu ${requiredLength} ký tự.`;
    }

    if (field?.hasError('min') && field.errors) {
      const requiredLength = field.errors['min']['min'];
      return `Phải có giá trị tối thiểu là ${requiredLength} .`;
    }
    if (field?.hasError('matDatepickerMin')) {
      return `Ngày khởi hành phải cách hôm nay ít nhất 7 ngày.`;
    }
    if (field?.hasError('email')) {
      return `Email không hợp lệ`;
    }
    
    return field['errors'] ? 'Lỗi' : '';
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return !field.valid && field.hasError('required') && field.touched;
  }
}
