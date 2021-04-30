import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(
		private httpClient: HttpClient,
		private global: GlobalService,
		private cookie: CookieService,
		private router: Router,
	) { }

	public getHttpHeaders(accessToken: string | null = null): HttpHeaders {
		let temp = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if(accessToken != null)
			Object.assign(temp, {
				Authorization: 'Bearer ' + accessToken,
			});

		return new HttpHeaders(temp);
	}

	sendGetRequest(withAccessToken: boolean, url: string, params: any = null, whendone: Function | null = null, whenfailed: Function | null = null):void {
		if(this.global.globalLoading)
			return;

		const accessToken = this.cookie.get('accessToken');
		const reqHeader = this.getHttpHeaders(withAccessToken ? accessToken : null);

		Object.assign(params, {
			paginate: this.global.defaultpaginate,
		});

		url = url.startsWith('/') ? url.substring(1) : url;
		this.global.globalLoading = true;
		this.httpClient.get(this.global.api + url, { 
			headers: reqHeader, params: params 
		}).subscribe((response: any) => {
			if(response.status) {
				if(whendone != null) {
					whendone(response.data);
				}
			} else {
				if(whenfailed != null) {
					whenfailed(response);
				} else {
					this.failedPrompt(response);
				}
			}
			this.global.globalLoading = false;
		}, (error: any) => {
			this.failedPrompt(error);
			this.global.globalLoading = false;
		});
	}

	sendPostRequest(withAccessToken: boolean, url: string, params: object | null = null, whendone: Function | null = null, whenfailed: Function | null = null): void {
		if(this.global.globalLoading)
			return;

		const accessToken = this.cookie.get('accessToken');
		const reqHeader = this.getHttpHeaders(withAccessToken ? accessToken : null);

		Object.assign(params, {
			paginate: this.global.defaultpaginate,
		});

		url = url.startsWith('/') ? url.substring(1) : url;
		this.global.globalLoading = true;
		this.httpClient.post(this.global.api + url, params, {
			headers: reqHeader
		}).subscribe((response: any) => {
			if(response.status) {
				if(whendone != null) {
					whendone(response.data);
				}
			} else {
				if(whenfailed != null) {
					whenfailed(response);
				} else {
					this.failedPrompt(response);
				}
			}
			this.global.globalLoading = false;
		}, (error: any) => {
			this.failedPrompt(error);
			this.global.globalLoading = false;
		});
	}

	public failedPrompt(response: any) {
		if(response.status == 401) {
			// doLogout abis session
			this.cookie.delete('accessToken', '/');
		}
	}

/*
	public dologout(url: string | null): void  {
		this.logoutajax(() => {

			this.global.accessToken = '';
			this.global.tokenType = '';

			this.cookie.delete('accessToken', '/');
			this.cookie.delete('tokenType', '/');

			if (url == null) {
				window.location.reload();
			} else {
				this.router.navigateByUrl(url);
			}
		}, () => {
			this.global.accessToken = '';
			this.global.tokenType = '';

			this.cookie.delete('accessToken', '/');
			this.cookie.delete('tokenType', '/');

			if (url == null) {
				window.location.reload();
			} else {
				this.router.navigateByUrl(url);
			}
		});
	}

	public logoutajax(whendone: object | null = null, whenfailed: object | null = null): void  {
		const data = {

		};
		this.sendPostRequest2('logout', data).subscribe((response: any) =>  {
			if (response != null) {
				if (whendone instanceof Function) {
					whendone(response);
				} else {
					console.log('Need callback function whendone in header.component.ts on deleteajax function');
				}
			} else {
				// kalo token dibuang dari twcdevices, dia masuk ke sini
				if (whenfailed instanceof Function) {
					console.log('Error: return logout api was null');
					whenfailed('');
				}
			}
		}, (error: any) => {
			// kalo token expired dia masuk kesini / server down
			console.log(error, 'error');
			if (whenfailed instanceof Function) {
				console.log('Error: error 500 logout');
				whenfailed('');
			}
		});
	}*/

	public getNowTime(whendone: object | null = null): void {
		let nowtime: any = null;
		const xhr = new XMLHttpRequest();
		xhr.open('GET', this.global.api + 'nowtime');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = (): void =>  {
			if (xhr.status === 200) {
				nowtime = xhr.responseText;
			} else if (xhr.status !== 200 ) {
				nowtime = null;
			}

			if (whendone instanceof Function) {
				nowtime = new Date(nowtime);
				whendone(nowtime);
			}
			return nowtime;
		};
		xhr.send();
	}

	public clientPublicIPajax(whendone: object | null = null, whenfailed: object | null= null): void {
		this.httpClient.get('https://api.ipify.org?format=json').subscribe((response: any) =>  {
			if (response != null) {
				if (whendone instanceof Function) {
					whendone(response);
				} else {
					console.log('Need callback function getclientpublicip in http.service.ts on clientPublicIPajax function');
				}
			} else {
				if (whenfailed instanceof Function) {
					console.log('Error: return getclientpublicip api was null');
					whenfailed('');
				}
			}
		});
	}

}
