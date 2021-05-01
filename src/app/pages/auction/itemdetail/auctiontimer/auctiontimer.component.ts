import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from './../../../../services/http.service';
import { GlobalService } from './../../../../services/global.service';

@Component({
  selector: 'app-itemdetail-auctiontimer',
  templateUrl: './auctiontimer.component.html',
  styleUrls: ['./auctiontimer.component.scss']
})
export class AuctiontimerComponent implements OnInit {

	@Input() targettime: Date | null;
	@Output() emitSold: EventEmitter<any> = new EventEmitter<any>();

	public restoftime: number;
	public timecountdown: number[];
	public interval: any;
	public servertime: Date | null;
	public deviation: number;

  constructor(
  	public global: GlobalService,
  	private http: HttpService,
	) { 
  	this.targettime = null;
  	this.restoftime = 0;
  	this.timecountdown = [0,0,0,0];
  	this.interval = null;
  	this.servertime = null;
  	this.deviation = 0;
	}

  ngOnInit(): void {
  	this.interval = setInterval(() => {
  		if(this.targettime != null){
  			const nowtime = new Date();
  			this.restoftime = Math.floor((this.targettime.getTime() - nowtime.getTime() - this.deviation) / 1000);

  			this.timecountdown = this.global.dhm(this.restoftime * 1000);

  			if(this.restoftime <= 0 && this.interval){
  				clearInterval(this.interval);
  				this.timecountdown = [0,0,0,0];
  				setTimeout(() => {
  					this.emitSold.emit();
  				}, 1000);
  			}
  		}
  	}, 500);

		this.getCountdownDetail();
  	setInterval(() => {
  		this.getCountdownDetail();
  	}, 60000);
  }

  public getCountdownDetail() {
  	this.http.sendGetRequest(
  		true,
  		'servertime',
  		{},
  		(data: any) => {
  			this.servertime = this.global.getDatetime(data.current_time);

  			let nowtime = new Date();
  			if(this.servertime != null) {
  				this.deviation = nowtime.getTime() - this.servertime.getTime();
  			}
  		},
  		(error: any) => {

  		},
  		false
		);
  }

}
