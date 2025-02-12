import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PharmacyComponent } from './pharmacy.component';
import { Routes, RouterModule } from '@angular/router';
import { MypharmacyComponent } from './mypharmacy/mypharmacy.component';
import { SelectHealthDrugComponent } from 'src/app/modules/healthdrug/selectors/healthdrug/healthdrug-selector.component';
import { SelectHealthlinkComponent } from 'src/app/modules/healthlink/selectors/healthlink/healthlink-selector.component';
import { SelectPlaceComponent } from 'src/app/modules/healthplace/selectors/healthplace/healthplace-selector.component';

const routes: Routes = [
	{
		path: '',
		component: PharmacyComponent
	},

	{
		path: ':drug_id',
		component: PharmacyComponent
	},
	{
		path: ':pharmacy_drug',
		component: PharmacyComponent
	},

	// {
	// 	path: ':place_drug',
	// 	component: PharmacyComponent
	// },

	// {
	// 	path: ':link_id',
	// 	component: PharmacyComponent
	// }
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, SelectHealthDrugComponent],
	declarations: [PharmacyComponent, MypharmacyComponent]
})
export class PharmacyModule {}
