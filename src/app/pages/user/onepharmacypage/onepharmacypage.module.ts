import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { OnepharmacypageComponent } from './onepharmacypage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':pharmacy_id',
		component: OnepharmacypageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [OnepharmacypageComponent]
})
export class OnepharmacypageModule {}
