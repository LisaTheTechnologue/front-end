import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'PENDING') {
      return 'Chờ leader trả lời';
    } else if (value === 'COMPLETED') {
      return 'Chấp nhận';
    } else if (value === 'REJECTED') {
      return 'Từ chối';
    } else {
      return value; // Return the original value if not matched
    }
  }

}
