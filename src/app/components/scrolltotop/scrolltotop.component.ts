import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
	faChevronUp as fasChevronUp,
} from '@fortawesome/pro-solid-svg-icons';

@Component({
	selector: 'comp-scrolltotop',
	templateUrl: './scrolltotop.component.html',
	styleUrls: ['./scrolltotop.component.scss']
})
export class ScrolltotopComponent implements OnInit {
	public windowScrolled: boolean;
	public fasChevronUp = fasChevronUp;

	constructor(@Inject(DOCUMENT) private document: Document) {
		this.windowScrolled = true;
	}

	@HostListener('window:scroll', [])
	public onWindowScroll(): void {
		if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
			this.windowScrolled = true;
		}
		else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
			this.windowScrolled = false;
		}
	}

	public scrollToTop(): void {
		(function smoothscroll(): any {
			const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
			if (currentScroll > 0) {
				window.requestAnimationFrame(smoothscroll);
				window.scrollTo(0, currentScroll - (currentScroll / 10));
			}
		})();
	}

	ngOnInit(): void {
	}
}
