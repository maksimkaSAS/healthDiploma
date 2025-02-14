import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PlacesComponent } from './places.component';
import { Routes, RouterModule } from '@angular/router';
import { PlaceComponent } from './place/place.component';
import { SelectHealthClinicComponent } from 'src/app/modules/healthclinic/selectors/healthclinic/healthclinic-selector.component';
import { SelectHealthDrugComponent } from 'src/app/modules/healthdrug/selectors/healthdrug/healthdrug-selector.component';
import { SelectHealthPharmacyComponent } from 'src/app/modules/healthpharmacy/selectors/healthpharmacy/healthpharmacy-selector.component';


const routes: Routes = [
	{
		path: '',
		component: PlacesComponent
	},

	{
		path: ':clinic_id',
		component: PlacesComponent
	},

	{
		path: ':place_drug',
		component: PlacesComponent
	},

	{
		path: ':pharmacy_id',
		component: PlacesComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule,
		SelectHealthClinicComponent,
		SelectHealthDrugComponent,
		SelectHealthPharmacyComponent
	],
	declarations: [PlacesComponent, PlaceComponent]
})
export class PlacesModule {}
