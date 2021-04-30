import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrolltotopComponent } from './components/scrolltotop/scrolltotop.component';
import { ItemlistComponent } from './pages/auction/itemlist/itemlist.component';
import { ItemrowComponent } from './pages/auction/itemlist/itemrow/itemrow.component';
import { ItemdetailComponent } from './pages/auction/itemdetail/itemdetail.component';
import { DetailauctionComponent } from './pages/auction/itemdetail/detailauction/detailauction.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		FooterComponent,
		ScrolltotopComponent,
		ItemlistComponent,
  ItemrowComponent,
  ItemdetailComponent,
  DetailauctionComponent,
  LoginComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		FormsModule,
		CommonModule,
		HttpClientModule,
		NgbModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
