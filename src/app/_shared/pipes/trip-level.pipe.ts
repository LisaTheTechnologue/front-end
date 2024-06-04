import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripLevel'
})
export class TripLevelPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'MASTER') {
      return 'Chuyên gia';
    } else if (value === 'MODERATE') {
      return 'Trung bình';
    } else if (value === 'EASY') {
      return 'Dễ';
    } else {
      return value; // Return the original value if not matched
    }
  }
}
