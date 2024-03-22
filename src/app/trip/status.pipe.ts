import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'COMPLETED':
        return 'Published';
      case 'CANCEL':
        return 'Cancel';
    }
    return 'Published';
  }

}
