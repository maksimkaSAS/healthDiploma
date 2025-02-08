import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PharmacyComponent } from './pharmacy.component';
import { Routes, RouterModule } from '@angular/router';
import { MypharmacyComponent } from './mypharmacy/mypharmacy.component';
import { SelectUserComponent } from 'src/app/modules/healthdrug/selectors/healthdrug/healthdrug-selector.component';

const routes: Routes = [
	{
		path: '',
		component: PharmacyComponent
	},

	{
		path: ':drug_id',
		component: PharmacyComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, SelectUserComponent],
	declarations: [PharmacyComponent, MypharmacyComponent]
})
export class PharmacyModule {}
