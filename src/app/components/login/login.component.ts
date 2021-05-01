import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { GlobalService } from './../../services/global.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	@Output() afterLogin = new EventEmitter<any>();
	public userkey: string;
	public password: string;

	constructor(
		private http: HttpService,
		private global: GlobalService,
		private cookie: CookieService,
	) { 
		this.userkey = "";
		this.password = "";
	}

	ngOnInit(): void {
	}

	public login() : void{
		const params = {
			userkey: this.userkey,
			password: this.password,
		}
		this.http.sendPostRequest(
			false,
			"login",
			params,
			(data: any) => {
				this.cookie.set('accessToken', data.token, {path: '/'});
				this.cookie.set('maxBidAmount', data.user.maxbidamount, {path: '/'});
				this.cookie.set('user', JSON.stringify(data.user), {path: '/'});
				this.global.user = data.user;
				setTimeout(() => {
					this.afterLogin.emit();
				}, 50);
			}
		)
	}

}
