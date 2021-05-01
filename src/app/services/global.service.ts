import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import * as moment from 'moment';
import 'moment-precise-range-plugin';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	public api: string;

	public version: string;
	public loginmodalshown = false;
	public refreshstatus = 0;

	public videogroupcategories = [];
	public defaultpaginate: number;

	public admin: any; // ini seluruh data admin
	public appName: string;
	public lastUpdate: string;
	public globalLoading: boolean;

	public pusherKey: string;
	public pusherCluster: string;
	public user: any;

	constructor() {
		this.globalLoading = false;
		this.lastUpdate = environment.lastUpdate;

		this.api = this.setProtocol(environment.apiUrl);
		this.version = environment.version;
		this.appName = environment.appName;
		this.defaultpaginate = 25;

		this.pusherKey = environment.pusher.key;
		this.pusherCluster = environment.pusher.cluster;
		this.user = null;
	}

	public setProtocol(url: string): string {
		if (url != null) {
			if (location.protocol !== 'https:' ) {
				// kalo http
				return url.replace('https://', 'http://');
			} else if (location.protocol === 'https:') {
				// ubah jadi https
				return url.replace('http://', 'https://');
			}
		} 
		return '';
	}

	public getLocalStringTime(dt: Date): string{
		let temp = "";
		temp += dt.getFullYear().toString().padStart(4, "0") + "-";
		temp += (dt.getMonth() + 1).toString().padStart(2, "0")+"-";
		temp += dt.getDate().toString().padStart(2, "0")+"T";
		temp += dt.getHours().toString().padStart(2, "0")+":";
		temp += dt.getMinutes().toString().padStart(2, "0");

		return temp;
	}

	public dhm(t: number): any{
		var cd = 24 * 60 * 60 * 1000,
			ch = 60 * 60 * 1000,
			cm = 60 * 1000,
			cs = 1000,
			d = Math.floor( t / cd ),
			h = Math.floor( (t - d * cd) / ch ),
			m = Math.floor( (t - d * cd - h * ch) / cm ),
			s = Math.floor( (t - d * cd - h * ch - m * cm) / cs ),
			pad = function(n: number){ return n < 10 ? '0' + n : n; };
		if( m === 60 ){
			h++;
			m = 0;
		}
		if( h === 24 ){
			d++;
			h = 0;
		}
		return [d%7, h, m, s];
	}

	public addHours = function(dt: Date, h: number): Date {
	  dt.setTime(dt.getTime() + (h*60*60*1000));
	  return dt;
	}

	public floor(x: number) : string{
		return Math.floor(x).toString();
	}

	public dateDiffInString(d1: Date | null, d2: Date | null = null): string {
		if(d1 == null) return "now";

		const m1 = moment(d1.toISOString().split('T')[0]);
		const m2 = d2 == null ? moment().format('M/D/YYYY') : moment(d2.toISOString().split('T')[0]);
		return (<any>moment).preciseDiff(m1, m2, false);
	}

	public getDatetime(dt: string | null): Date | null {
		if (dt == null) {
			return null;
		}
		if (dt === '') {
			return null;
		}
		let dt2 = null;
		try {
			dt2 = new Date(dt.replace(/\second/, 'T'));
			/*if (dt2 === 'Invalid Date') {
				return null;
			}*/

			return dt2;
		} catch ($e) {
			return null;
		}
	}

}
