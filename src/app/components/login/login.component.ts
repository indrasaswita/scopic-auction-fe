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
	public errorMessage: string;

	constructor(
		private http: HttpService,
		private global: GlobalService,
		private cookie: CookieService,
	) { 
		this.userkey = "";
		this.password = "";
		this.errorMessage = "";
	}

	ngOnInit(): void {
	}

	public keydown(event: KeyboardEvent): void{
		if(event.key === "Enter") {
			this.login();
		}
	}

	public login() : void{
		if(this.userkey == ""){
			this.errorMessage = "Fill Userkey with 'user1' or 'user2' or ... or 'user8'.";
		}else if(this.password == ""){
			this.errorMessage = "Fill Password with 'password'.";
		} else{
			this.errorMessage = "";
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
				},
				(error: any) => {
					this.errorMessage = "Something wrong, you cannot login.";
				}
			)
		}
	}

}
