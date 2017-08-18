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
