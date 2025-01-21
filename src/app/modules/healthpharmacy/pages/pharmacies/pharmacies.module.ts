import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PharmaciesComponent } from './pharmacies.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PharmaciesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PharmaciesComponent],
	providers: []
})
export class PharmaciesModule {}
