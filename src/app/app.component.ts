import { Component } from '@angular/core';
import {
	faList as fasList
} from '@fortawesome/pro-solid-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'fe';
	public fasList = fasList;
	public toggled: boolean;

	public menus: any;

	constructor(){
		this.toggled = false;
		this.menus = [
			{
				'label': 'Produk',
				'url' : '',
				'showdetail': false,
				'items': [
					{
						'label': 'Varian',
						'url': ''
					},
					{
						'label': 'Body & Paint',
						'url': ''
					},
					{
						'label': 'Product Update',
						'url': ''
					}
				]
			},
			{
				'label': 'Layanan',
				'url' : '',
				'showdetail': false,
				'items': [
					{
						'label': 'Harga OTR',
						'url': ''
					},
					{
						'label': 'Service',
						'url': ''
					},
					{
						'label': 'Fasilitas',
						'url': ''
					},
					{
						'label': 'Hubungi Kami',
						'url': ''
					}
				]
			},
			{
				'label': 'Tentang Kami',
				'url' : '',
				'showdetail': false,
				'items': [
					{
						'label': 'Karir',
						'url': ''
					}
				]
			}
		];
	}

	public togglesidebar(): void{
		this.toggled = this.toggled ? false : true;
	}

	public toggleDetail(menu: any): void{
		const temp = menu.showdetail ? false : true;
		this.menus.forEach((ii: any) => {
			ii.showdetail = false;
		});
		menu.showdetail = temp;
	}

	public setCurrentPage(item: any){

	}
}
