import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../services/http.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit {

	public items: any;
	public keyword: string;
	public page: number;

  constructor(
  	private http: HttpService,
	) { 
  	this.items = [];
  	this.keyword = "";
  	this.page = 1;
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
  			this.items = data.items.data;
  		}
		);
  }

}
