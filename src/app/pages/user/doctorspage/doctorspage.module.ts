import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DoctorspageComponent } from './doctorspage.component';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { SelectHealthClinicComponent } from 'src/app/modules/healthclinic/selectors/healthclinic/healthclinic-selector.component';

const routes: Routes = [
	{
		path: '',
		component: DoctorspageComponent
	},

	{
		path: ':clinic_id',
		component: DoctorspageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, SelectHealthClinicComponent],
	declarations: [DoctorspageComponent, DoctorComponent]
})
export class DoctorspageModule {}
