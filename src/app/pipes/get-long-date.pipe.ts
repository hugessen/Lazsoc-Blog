import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getLongDate'
})
export class GetLongDate {
  transform(dateStr:string) {
    var date = new Date(dateStr);
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var result:string = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    return result;
  }
}

@Pipe({
  name: 'getTime'
})
export class GetTime {
  transform(dateStr:string) {
    var hour = new Date(dateStr).getUTCHours();
    var min = new Date(dateStr).getUTCMinutes();
    var minStr = (min < 10) ? min+"0":min;
    var ampm = (hour < 12) ? "AM" : "PM";
    if(hour > 12) {
      hour = hour%12;
    }
    return (hour + ":" + minStr + " " + ampm);
  }
}
