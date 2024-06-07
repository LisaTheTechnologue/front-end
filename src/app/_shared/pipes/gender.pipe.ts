import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'FEMALE') {
      return 'Nữ';
    } else if (value === 'MALE') {
      return 'Nam';
    } else if (value === 'OTHER') {
      return 'Khác';
    } else {
      return 'Không công khai'; // Return the original value if not matched
    }
  }

}
