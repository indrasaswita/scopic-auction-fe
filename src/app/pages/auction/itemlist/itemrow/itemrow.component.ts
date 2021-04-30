import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
	faHourglassStart as fadHourglassStart
} from '@fortawesome/pro-duotone-svg-icons';

@Component({
  selector: 'app-itemlist-itemrow',
  templateUrl: './itemrow.component.html',
  styleUrls: ['./itemrow.component.scss']
})
export class ItemrowComponent implements OnInit {

	public fadHourglassStart = fadHourglassStart;
	@Input() data: any;

  constructor(
  	private router: Router,
	) { }

  ngOnInit(): void {
  }

  public goToDetail(){
  	this.router.navigateByUrl("/auction/itemdetail?i=" + this.data.id);
  }

}
