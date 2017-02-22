import {Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HTTPService{
    constructor(private _http: Http){}
       getGanttChartData(){
          return this._http.get('https://api.myjson.com/bins/y6rqd')
          .map((res:Response) => res.json());
        }
    
} 
//https://api.myjson.com/bins/fd9at  only one data
//https://api.myjson.com/bins/12cxip  full data