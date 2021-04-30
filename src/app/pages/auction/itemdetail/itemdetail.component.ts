import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../services/http.service';
import { GlobalService } from './../../../services/global.service';
import { CookieService } from 'ngx-cookie-service';
import Pusher from 'pusher-js';
import {
	faHourglassStart as fadHourglassStart,
	faMobile as fadMobile,
	faHouse as fadHouse,
	faMugHot as fadMugHot,
	faHourglass as fadHourglass,
	faFrenchFries as fadFrenchFries,
	faMask as fadMask,
	faFingerprint as fadFingerprint,
	faGamepadAlt as fadGamepadAlt,
	faSun as fadSun,
	faDrum as fadDrum,
} from '@fortawesome/pro-duotone-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.scss']
})
export class ItemdetailComponent implements OnInit {

	public fadMobile = fadMobile;
	public fadHouse = fadHouse;
	public fadMugHot = fadMugHot;
	public fadHourglass = fadHourglass;
	public fadFrenchFries = fadFrenchFries;
	public fadMask = fadMask;
	public fadFingerprint = fadFingerprint;
	public fadGamepadAlt = fadGamepadAlt;
	public fadSun = fadSun;
	public fadDrum = fadDrum;

	public newbidamount: number;
	public fadHourglassStart = fadHourglassStart;
	public item_id: number;
	public item: any;
	public pusherClient: Pusher;

  constructor(
  	private router: Router,
  	private activatedRoute: ActivatedRoute,
  	private http: HttpService,
  	public cookie: CookieService,
  	public global: GlobalService,
	) { 
  	this.item_id = 0;
  	this.item = null;
  	this.activatedRoute.queryParams.subscribe(params => {
  		if(params && params.i){
  			this.item_id = params.i;
  		}
  	})
  	this.newbidamount = 0;
	}

  ngOnInit(): void {
  	if(this.cookie.get('accessToken') !== ''){
	  	this.getItemDetail();
	  }
	  this.initEcho();
  }

  public initEcho(): void {
  	this.pusherClient = new Pusher(this.global.pusherKey, {
  		cluster: this.global.pusherCluster,
  	});

  	const channel = this.pusherClient.subscribe('bid.'+this.item_id);
		this.pusherClient.bind(
			'scopic_auction',
			(data: any) => {
				console.log('pusher', data);
				this.item.itemusers.unshift(data.itemuser);
				this.item.itemusers[0].user = data.user;
				this.item.endbidamount = data.itemuser.bidamount;
				console.log(this.item);

				this.newbidamount = data.itemuser.bidamount + 1;
				if(data.itemuser.bidamount < 200){
					this.bid();
				}
			}
		);
  }

  public getItemDetail(): void {
  	const params = {
  		item_id: this.item_id,
  	};
  	console.log("SUCCESS 2");
  	this.http.sendGetRequest(
  		true,
  		'item/detail',
  		params,
  		(data: any) => {
  			this.item = data.item;
  		}
		)
  }

  public afterLoginSuccess(): void {
  	console.log("SUCCESS");
  	this.getItemDetail();
  }

  public bid(){
  	const params = {
  		item_id: this.item_id,
  		bidamount: this.newbidamount,
  	};

  	this.http.sendPostRequest(
  		true,
  		'item/bid',
  		params,
  		(data: any) => {
  			console.log(data);
  		}
		);
  }

}
