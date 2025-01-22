import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TradeComponent } from './trade.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TradeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TradeComponent],
	providers: []
})
export class TradeModule {}
