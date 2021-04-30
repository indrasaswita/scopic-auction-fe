import { Component, OnInit } from '@angular/core';
import {
	faFacebookSquare as fabFacebookSquare,
	faInstagramSquare as fabInstagramSquare,
	faLinkedin as fabLinkedin,
	faGithub as fabGithub,
	faWhatsapp as fabWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public fabFacebookSquare = fabFacebookSquare;
	public fabInstagramSquare = fabInstagramSquare;
	public fabLinkedin = fabLinkedin;
	public fabGithub = fabGithub;
	public fabWhatsapp = fabWhatsapp;
	public skills: { title: string, value: string }[];
	public experiences: { title: string, type: string, description: string, years: string }[];
	public content: string;
	public showlength: number;
	public isflipflopactive: boolean;

	constructor() {
		this.content = 'I love creating a web based application, such as portfolio, e-commerse, catalogue, or anything else. Work with interactive and clean code.';
		this.showlength = this.content.length;
		this.isflipflopactive = false;

		setTimeout(() => {
			this.showlength = 0;
			this.isflipflopactive = true;
			const intv = setInterval(() => {
				if (this.showlength++ === this.content.length + 2){
					this.isflipflopactive = false;
					clearInterval(intv);
				}
			}, 60);
		}, 50);

		this.skills = [
			{ title: 'Angular CLI (v2 or higher)', value: '95%' },
			{ title: 'Laravel', value: '93%' },
			{ title: 'HTML & SASS (scss)', value: '90%' },
			{ title: 'Typescript & Javascript', value: '87%' },
			{ title: 'MySQL', value: '74%' },
			{ title: 'Angular.js (v1)', value: '70%' },
		];

		this.experiences = [
			{ title: 'TEACHING ASSISTANT SLC', type: 'BINA NUSANTARA - FULLTIME', description: 'One of my best places and jobs to learn more about programming.<br>Learn how to convey aspirations and be trained in teaching.', years: '2011-2013' },
			{ title: 'MOBILE GAME PROGRAMMING', type: 'UNDERGRADUATE PROGRAMME (S1) - THESIS', description: 'Creating a game called PHOSTER, a game like a Pokémon that we can catch, train monsters and do battle which directly depends on the weather around the player.<br>Learning multiple threading works in mobile Android platform.', years: '2013-2014' },
			{ title: 'DESKTOP PROGRAMMING', type: 'FREELANCE', description: 'Creating a simple POS system based on C#.NET and Crystal Report 2010 for reporting.', years: '2013-2015' },
			{ title: 'DESKTOP PROGRAMMING', type: 'FREELANCE', description: 'Update POS from C# to VB.NET.<br>Develop and fix several bugs.<br>Implement socket programming for connect 2 cash drawers and printers to a single program.', years: '2015' },
			{ title: 'SALES & PURCHASING', type: 'RAHAYU PRINTING - FULLTIME', description: 'Create a digital market for a printing company, learn some important things about sales and purchasing.<br>Learn how to solve common problems with machines.', years: '2014-2018' },
			{ title: 'WEB FULLSTACK PROGRAMMING', type: 'RAHAYU PRINTING - PARTTIME', description: 'Develop JAKARTABROSUR website for sell printing online.<br>Make online calculations, shopping carts, and transactions for online sales.<br>Learn & implement NPM, Laravel 5, jQuery and Angular.js.<br>Maintain SEO and Google Analytics.', years: '2015-2019' },
			{ title: 'MOBILE FULLSTACK PROGRAMMING', type: 'RAHAYU PRINTING - PARTTIME', description: 'Create an Android based program for the admin of JAKARTABROSUR, where employees can handle transactions in real time from mobile apps.', years: '2019' },
			{ title: 'LINUX SERVER', type: 'SKYBRIDGE - PROJECT', description: 'Learn to create hosting environment in a VPS based on CentOS 7.<br>Implement staging step and version control for some repositories.<br>Maintain logs for automatic Cron Job.<br>2020: Learn & use EXIM to send bulk email.', years: '2020-now' },
			{ title: 'JPCC.TV', type: 'SKYBRIDGE - PROJECT', description: '2020: Create backend system based on Laravel 7.<br>2020: Learn & implement video.js and Angular 8 environment.<br>2020: Learn & implement livestreaming video with NGINX, Redhat, OBS and video.js.<br>2020: Learn & implement script for auto downloading from Youtube videos with youtube-dl.<br>2020: Learn & implement Google Analytics and Google DataStudio for jpcc.tv.<br>2021: Learn & implement websocket programming (Pusher.js) for chatroll system.', years: '2020-2021' },
			{ title: 'SENIOR BACKEND PROGRAMMING', type: 'SKYBRIDGE - FULLTIME', description: 'Work in a company which provides for the various needs of the church.<br>Maintain package version with NPM on each projects.<br>Creating database diagrams based on business process.<br>2020: Upgrade several programs to Angular CLI and maintain SEO.<br>2020: Learn & implement Midtrans for payment process.<br>2020: Learn & implement NusaSMS and Twilio for sending SMS OTP.<br>2020: Create parsial backup system between two servers with Laravel-Angularjs.<br>2020: Learn how to use Firewall WHM system.<br>2021: Learn & implement Whatsapp (non-business account) Robot with Python-Selenium-Pusher(ws).', years: '2020-2021' },
			{ title: 'SENIOR DEVELOPER', type: 'SKYBRIDGE - FULLTIME', description: 'Manage & maintain server.<br>Delegating work & assignment to team members.<br>Creating goals.<br>Control system modification and code review.<br>Encourage team members to achieve goals.<br>Troubleshoot any hard problems.<br>Research for some advance technology.<br>Do technical documentation and create TSD.<br>Maintain Bitbucket GIT, Google Analytics, Firebase, DataStudio.<br>2021: Create MyJPCC backbone with Ionic 5.<br>2021: Implement Miro for discussion, make flow and diagrams.<br>2021: Research for Websocket service for payment notification.', years: '2021-now' },
		];

		this.experiences.reverse();
	}

	ngOnInit(): void {
	}

}
