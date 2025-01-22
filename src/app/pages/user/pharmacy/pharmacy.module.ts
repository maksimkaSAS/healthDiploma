import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PharmacyComponent } from './pharmacy.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PharmacyComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PharmacyComponent]
})
export class PharmacyModule {}
