import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getLongDate'
})
export class GetLongDate {
  transform(dateStr: string) {
    let date = new Date(dateStr);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let result: string = days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    return result;
  }
}

@Pipe({
  name: 'getShortDate'
})
export class GetShortDate {
  transform(dateStr: string) {
    let date = new Date(dateStr);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let result: string = months[date.getMonth()] + ' ' + date.getDate();
    return result;
  }
}

@Pipe({
  name: 'getTime'
})
export class GetTime {
  transform(dateStr: string) {
    let hour = new Date(dateStr).getUTCHours();
    let min = new Date(dateStr).getUTCMinutes();
    let minStr = (min < 10) ? min + '0' : min;
    let ampm = (hour < 12) ? 'AM' : 'PM';
    if (hour > 12) {
      hour = hour % 12;
    }
    return (hour + ':' + minStr + ' ' + ampm);
  }
}

@Pipe({
  name: 'getMonth'
})
export class GetMonth {
  transform(dateStr: string) {
    let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
    let date = new Date(dateStr).getMonth();
    return months[date];
  }
}

@Pipe({
  name: 'getDate'
})
export class GetDate {
  transform(dateStr: string) {
    return new Date(dateStr).getDate();
  }
}
