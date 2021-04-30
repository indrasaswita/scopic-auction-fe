import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import * as moment from 'moment';
import 'moment-precise-range-plugin';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	public api: string;

	public clientPublicIP: string;
	public accessToken: string;
	public tokenType: string;
	public defaultresolution: number;
	public version: string;
	public bodybackground: string;
	public bodybackgroundimage: string;
	public loginmodalshown = false;
	public refreshstatus = 0;

	public videogroupcategories = [];
	public timediff: number;
	public defaultpaginate: number;

	public admin: any; // ini seluruh data admin
	public appName: string;
	public lastUpdate: string;
	public globalLoading: boolean;

	public pusherKey: string;
	public pusherCluster: string;

	constructor() {
		this.globalLoading = false;
		this.lastUpdate = environment.lastUpdate;

		this.accessToken = '';
		this.tokenType = '';
		this.api = this.setProtocol(environment.apiUrl);
		this.clientPublicIP = '';
		this.defaultresolution = 0;
		this.bodybackground = '';
		this.bodybackgroundimage = '';
		this.timediff = 0;
		this.defaultpaginate = 0;
		this.admin = {}; // ini seluruh data admin
		this.lastUpdate = '';
		this.version = environment.version;
		this.appName = environment.appName;
		this.refreshstatus = 0;
		this.defaultpaginate = 25;
		this.defaultresolution = 720;

		this.pusherKey = environment.pusher.key;
		this.pusherCluster = environment.pusher.cluster;
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
