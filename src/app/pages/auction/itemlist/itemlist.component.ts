import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../services/http.service';
import { GlobalService } from './../../../services/global.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit {

	public items: any;
	public keyword: string;
	public page: number;
	public user: any;
	public showLoadMore: boolean;

  constructor(
  	private http: HttpService,
  	private global: GlobalService,
  	private cookie: CookieService,
	) { 
  	this.items = [];
  	this.keyword = "";
  	this.page = 1;
  	this.showLoadMore = true;

		this.user = this.cookie.get('user') != "" ? JSON.parse(this.cookie.get('user')) : null;
	}

  ngOnInit(): void {
  	this.getItemPaginated();
  }

  public getItemPaginated(): void {
  	const params = {
  		name: this.keyword,
  		page: this.page,
  	};

  	this.http.sendGetRequest(
  		false, 
  		'item/all/filtered',
  		params,
  		(data: any) => {
  			console.log('onsuccess', data.items);
  			if(data.items.current_page >= data.items.last_page) {
  				this.showLoadMore = false;
  			}
  			data.items.data.forEach((ii: any) => {
  				this.items.push(ii);
  			});
  		}
		);
  }

  public loadMore(): void {
  	this.page++;
  	this.getItemPaginated();
  }

}
