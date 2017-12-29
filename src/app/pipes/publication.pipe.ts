import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPublicationDate'
})
export class PublicationPipe {
  transform(dateStr:string) {
  	const ONE_DAY = 60*60*24*1000;
    var pubDate = new Date(dateStr);
    var currentTime = new Date();
    let diff = currentTime.getTime() - pubDate.getTime()
    if (diff < 60*60*1000) {
    	let num = Math.floor(diff / (60*1000));
    	return `${num} minutes ago`
    }
    else if (diff < ONE_DAY){
    	let num = Math.floor(diff / (60*60*1000));
    	if (num == 1)
    		return `1 hour ago`;
    	else
    		return `${num} hours ago`;
    }
    else if (diff < 5*ONE_DAY) {
    	let num = Math.floor(diff / (60*60*1000));
    	if (num == 1)
    		return `1 day ago`;
    	else
    		return `${num} days ago`;
    }
    else {
	    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	    var result = months[pubDate.getMonth()] + " " + pubDate.getDate()
	    if (pubDate.getFullYear != currentTime.getFullYear)
	    	result += ", " + pubDate.getFullYear();
	    return result;
    }
  }
}