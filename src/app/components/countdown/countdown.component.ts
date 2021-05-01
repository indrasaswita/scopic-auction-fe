import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from './../../services/global.service';
import { HttpService } from './../../services/http.service';
import {
	faClock,
} from '@fortawesome/pro-duotone-svg-icons';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

	fadClock = faClock;

	@Input() timecountdown:number[];
	public strcountdown:string[];
	public nowtime: Date | null = null;

 constructor(
 	public global: GlobalService,
 	private http: HttpService,
	) { 
 	this.nowtime = new Date();
 	this.timecountdown = [0, 0, 0, 0];
 	this.strcountdown = ['day', 'hour', 'minute', 'second'];
 }

 ngOnInit(): void {

 }

 ngAfterViewInit(){
		
 }


	public calculateCountdownTimer(){

	}

}
