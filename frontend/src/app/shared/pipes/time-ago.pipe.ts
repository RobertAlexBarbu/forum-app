import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const date2 = new Date(value);
      const seconds = Math.floor((+new Date() - +date2) / 1000);
      if (seconds < 29) return 'Just now';
      const intervals: { [key: string]: number } = {
        y: 31536000,
        mon: 2592000,
        w: 604800,
        d: 86400,
        h: 3600,
        min: 60,
        s: 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + i + ' ago';
          } else {
            return counter + i + ' ago';
          }
      }
    }
    return value;
  }
}
