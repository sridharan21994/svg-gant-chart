import {
  Component,
  OnInit
} from '@angular/core';
import {
  HTTPService
} from './http.service';

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.css'],
})
export class HttpComponent implements OnInit {

finalTask: any[];
finalInterval:any[];
span:number;
heightSpan:number;
  constructor(private _httpTestService: HTTPService) {}
  ngOnInit() {
    this._httpTestService.getGanttChartData()
      .subscribe(
        ganttChartData => this.convertTimeScaleToSpace(ganttChartData),
        error => alert(error),
      );
  }
  findXaxislabel(ticksObject,min){
    var XaxisLabel=[];
    var interval=ticksObject.tickWidth;
    if(min<12){}

  }
  convertTo24Hour(time) {
    var hours = parseInt(time.substr(0, 2));
    if (time.indexOf('am') != -1 && hours == 12) {
      time = time.replace('12', '0');
    }
    if (time.indexOf('am') != -1 && hours < 10) {
      time = time.replace(time, '0' + time);
    }
    if (time.indexOf('pm') != -1 && hours < 12) {
      time = time.replace(hours, (hours + 12));
    }
    return time.replace(/(am|pm)/, '');
  }
  findmaxTime (max,endTime){
  var time=endTime.split(":");
  var HH=Number(time[0]);
  var MM=Number(time[1]);
  var time2=HH+MM/60;
  if(max<time2)
  {
    max=time2;
    return max;
  }
    else{
      return max;
    }
}
 findminTime (min,endTime){
  var time=endTime.split(":");
  var HH=Number(time[0]);
  var MM=Number(time[1]);
  var time2=HH+MM/60;
  if(min>time2)
  {
    min=time2;
    return min;
  }
    else{
      return min;
    }
  }
  findNumberOfTicks(min,max){
    var maxInterval= Math.ceil(max-min);
    if(maxInterval<5){
    
       var ticks=  {
            "noOfTicks":maxInterval*4,
            "tickWidth":0.25
          }
          return ticks;
            }
    else if(maxInterval>=5&&maxInterval<=8){
      var ticks=  {
            "noOfTicks":maxInterval*2,
            "tickWidth":0.5
          }
          return ticks;
    }
    else if(maxInterval>16){
       var ticks=  {
            "noOfTicks":Math.ceil(maxInterval/2),
            "tickWidth":2
          }
          return ticks;
    }
    else{
      var ticks=  {
            "noOfTicks":maxInterval,
            "tickWidth":1
          }
          return ticks;
    }
  }
  convertTimeScaleToSpace(ganttChartData) {
    var taskArray = [];
    var taskarray2 = [];
var displayInterval=[];
    var min=23,max=0;
    var ticksObject:any;
    var count=0;
    var hour;
    var minute;
    taskArray = ganttChartData.taskArray;
    for (var task of taskArray) {
      var taskObject:any={};
      var startTime24HourFormat = this.convertTo24Hour(task.startTime);
      var endTime24HourFormat = this.convertTo24Hour(task.endTime);
      var startTime= startTime24HourFormat.split(":");
      var startPoint=Number(startTime[0])+Number(startTime[1])/60;
      var endTime= endTime24HourFormat .split(":");
      var endPoint= Number(endTime[0])+ Number(endTime[1])/60;
      var width=endPoint-startPoint;
      taskObject={
        "taskLabel":task.task,
        "startPoint":startPoint,
        "width":width,
      }
    taskarray2.push(taskObject);
      max=this.findmaxTime(max,endTime24HourFormat);
      min=this.findminTime(min,startTime24HourFormat);
      count++;
    }
    ticksObject=this.findNumberOfTicks(min,max);
     for(var i=0;i<count;i++){
      taskarray2[i].startPoint=taskarray2[i].startPoint-min;
    }
    console.log(taskarray2);
    this.finalTask=taskarray2;
    console.log(this.finalTask);
    console.log(ticksObject);
    hour=min;
    minute=0;

if(hour>12){
      hour=hour-12;
    }
displayInterval.push(hour);
    
    for(var i=0; i< Number(ticksObject.noOfTicks); i++ ){

  if(Number(ticksObject.tickWidth)==0.25){
    this.span=4;
minute=minute+15;
if(minute==60)
{
  hour=hour+1;
  minute=0;
}
  }
else if(Number(ticksObject.tickWidth)==0.50){
      this.span=2;

  minute=minute+30;
  if(minute==60)
{
  hour=hour+1;
  minute=0;
}
}
else if(Number(ticksObject.tickWidth)===1){
      this.span=1;

  console.log("dfgsdfg");
  hour=hour+1;
}
else if(Number(ticksObject.tickWidth)==2){
      this.span=0.5;

  hour= hour+2;
}
if(hour>12){
      hour=hour-12;
    }

if(minute==0){
    if(hour===12){
        displayInterval.push(hour+"P");

    }else
  displayInterval.push(hour);
}
else{
   if(hour===12){
        displayInterval.push(hour+"P");

    }else
displayInterval.push(hour+":"+minute);
}
}
    
this.finalInterval=displayInterval;
console.log(this.finalInterval)
this.heightSpan= this.finalTask.length;
console.log(this.heightSpan)
  }

}
