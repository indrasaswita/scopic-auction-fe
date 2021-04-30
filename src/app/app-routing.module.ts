import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ItemlistComponent} from './pages/auction/itemlist/itemlist.component';
import { ItemdetailComponent} from './pages/auction/itemdetail/itemdetail.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'auction/itemlist', component: ItemlistComponent },
	{ path: 'auction/itemdetail', component: ItemdetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
