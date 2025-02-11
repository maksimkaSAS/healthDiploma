import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PlacesComponent } from './places.component';
import { Routes, RouterModule } from '@angular/router';
import { PlaceComponent } from './place/place.component';
import { SelectUserComponent } from 'src/app/modules/healthclinic/selectors/healthclinic/healthclinic-selector.component';


const routes: Routes = [
	{
		path: '',
		component: PlacesComponent
	},

	{
		path: ':clinic_id',
		component: PlacesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, SelectUserComponent],
	declarations: [PlacesComponent, PlaceComponent]
})
export class PlacesModule {}
