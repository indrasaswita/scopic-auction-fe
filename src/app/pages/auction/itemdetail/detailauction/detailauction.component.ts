import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-itemdetail-detailauction',
  templateUrl: './detailauction.component.html',
  styleUrls: ['./detailauction.component.scss']
})
export class DetailauctionComponent implements OnInit {

	@Input() name: string;
	@Input() updated_at: Date | null;
	@Input() bidamount: number;
	@Input() index: number;

  constructor() { 
  	this.name = "";
  	this.updated_at = null;
  	this.bidamount = 0;
  	this.index = -1;
  }

  ngOnInit(): void {
  }

}
