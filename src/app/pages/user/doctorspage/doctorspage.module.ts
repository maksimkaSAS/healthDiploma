import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DoctorspageComponent } from './doctorspage.component';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';

const routes: Routes = [
	{
		path: '',
		component: DoctorspageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DoctorspageComponent, DoctorComponent]
})
export class DoctorspageModule {}
