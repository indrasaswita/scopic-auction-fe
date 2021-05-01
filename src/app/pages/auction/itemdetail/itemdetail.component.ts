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
	faToggleOff as fadToggleOff,
	faToggleOn as fadToggleOn,
	faUsersSlash as fadUsersSlash,
} from '@fortawesome/pro-duotone-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
	selector: 'app-itemdetail',
	templateUrl: './itemdetail.component.html',
	styleUrls: ['./itemdetail.component.scss']
})
export class ItemdetailComponent implements OnInit {

	public fadHourglassStart = fadHourglassStart;
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
	public fadToggleOff = fadToggleOff;
	public fadToggleOn = fadToggleOn;
	public fadUsersSlash = fadUsersSlash;

	public newbidamount: number;
	public item_id: number;
	public item: any;
	public pusherClient: Pusher | null;
	public autobid: boolean;
	public isloadingbid: boolean;
	public errorMessage: string;
	public user: any;
	public auctionend_at: string;
	public interval: any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private http: HttpService,
		public cookie: CookieService,
		public global: GlobalService,
	) { 
		this.item_id = 0;
		this.item = null;
		this.isloadingbid = false;
		this.activatedRoute.queryParams.subscribe(params => {
			if(params && params.i){
				this.item_id = params.i;
			}
		})
		this.newbidamount = 0;
		this.pusherClient = null;
		this.autobid = false;
		this.errorMessage = "";
		this.user = this.cookie.get('user') != "" ? JSON.parse(this.cookie.get('user')) : {};
		this.interval = null;
	}

	ngOnInit(): void {
		if(this.cookie.get('accessToken') !== ''){
			this.getItemDetail();
		}
		this.initEcho();
	}

	public toggleOnOffAuto(): void {
		this.autobid = !this.autobid;


		this.errorMessage = "";
		if(this.item?.itemusers[0].user_id != this.user?.id) {
			this.bid();
			this.errorMessage = "";
		} else {
			this.errorMessage = "You cannot bid since you got the highest bidding amount.";
		}


		if(this.autobid == true){
			this.interval = setInterval(() => {
				if(this.item?.itemusers[0]?.user_id != this.user?.id) {
					this.bid();
					this.errorMessage = "";
				}
			}, 2500);
		}else{
			clearInterval(this.interval);
		}
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

				this.newbidamount = data.itemuser.bidamount + 1;
				this.errorMessage = "";
				if(this.autobid) {
					if(this.cookie.get('maxBidAmount') != ''){
						if(data.itemuser.bidamount < this.cookie.get('maxBidAmount')){
							this.bid();
						}
					}
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

				this.newbidamount = ( this.item.endbidamount ? this.item.endbidamount : 0 ) + 1;

				if(this.item.status === "Draft") {
					this.auctionend_at = this.global.getLocalStringTime(new Date());
				}
			}
		)
	}

	public afterLoginSuccess(): void {
		console.log("SUCCESS");
		this.getItemDetail();

		this.user = this.cookie.get('user') != "" ? JSON.parse(this.cookie.get('user')) : {};
	}

	public bid(){
		if(this.isloadingbid == false) {
			this.isloadingbid = true;
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
					this.errorMessage = "";
					this.isloadingbid = false;
				},
				(error: any) => {
					this.errorMessage = error.message;
					this.isloadingbid = false;
				}, 
				false
			);
		}
	}

	public openAuction(): void {
		const params = {
			auctionend_at: this.auctionend_at,
			item_id: this.item_id,
		};

		this.http.sendPostRequest(
			true,
			"item/open",
			params,
			(data: any) => {
				this.item.status = "Active";
				this.errorMessage = "Congratulation. Your item is now active in the auction table.";

				setTimeout(() => {
					this.errorMessage = "";
				}, 5000);
			},
			(error: any) => {
				this.errorMessage = error.message;
			}
		);
	}

	public setStatusSold(){

		this.item.status = "Sold";
	}

}
