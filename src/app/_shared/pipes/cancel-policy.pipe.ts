import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cancelPolicy'
})
export class CancelPolicyPipe implements PipeTransform {

  transform(value: string): string {
    if (value === '75%') {
      return 'Hoàn 75%';
    } else if (value === '50%') {
      return 'Hoàn 50%';
    } else if (value === 'No') {
      return 'Không được hoàn tiền';
    } else if (value === 'Full') {
      return 'Hoàn toàn bộ số tiền';
    } else {
      return value; // Return the original value if not matched
    }
  }

}
