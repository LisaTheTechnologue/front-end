import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripStatus'
})
export class TripStatusPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'PENDING') {
      return 'Chờ duyệt';
    } else if (value === 'APPROVED') {
      return 'Đang nhận khách';
    } else if (value === 'REJECTED') {
      return 'Từ chối';
    } else if (value === 'CANCEL') {
      return 'Cancel';
    } else if (value === 'END') {
      return 'Kết thúc';
    } else {
      return value; // Return the original value if not matched
    }
  }

}
