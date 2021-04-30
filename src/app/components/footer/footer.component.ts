import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	faFacebookSquare as fabFacebookSquare,
	faInstagramSquare as fabInstagramSquare,
	faLinkedin as fabLinkedin,
	faGithub as fabGithub
} from '@fortawesome/free-brands-svg-icons';
import {
	faHorizontalRule as falHorizontalRule,
} from '@fortawesome/pro-light-svg-icons';
import { GlobalService } from './../../services/global.service';

@Component({
	selector: 'comp-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	public fabFacebookSquare = fabFacebookSquare;
	public fabInstagramSquare = fabInstagramSquare;
	public fabLinkedin = fabLinkedin;
	public fabGithub = fabGithub;
	public falHorizontalRule = falHorizontalRule;
	public hostname: string;
	public nowyear: string;

	constructor(
		public router: Router,
		public global: GlobalService,
	) {
		this.hostname = window.location.hostname;
		this.nowyear = (new Date()).getFullYear() + '';
	}

	ngOnInit(): void {
	}

}
