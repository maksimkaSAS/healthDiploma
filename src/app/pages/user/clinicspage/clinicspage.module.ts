import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ClinicspageComponent } from './clinicspage.component';
import { Routes, RouterModule } from '@angular/router';
import { ClinicComponent } from './clinic/clinic.component';
import { SelectUserComponent } from 'src/app/modules/healthplace/selectors/healthplace/healthplace-selector.component';

const routes: Routes = [
	{
		path: '',
		component: ClinicspageComponent
	},

	// {
	// 	path: ':place_id',
	// 	component: ClinicspageComponent
	// }
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, SelectUserComponent],
	declarations: [ClinicspageComponent, ClinicComponent]
})
export class ClinicspageModule {}
