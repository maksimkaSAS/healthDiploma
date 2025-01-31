import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DoctorpageComponent } from './doctorpage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':doctor_id',
		component: DoctorpageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DoctorpageComponent]
})
export class DoctorpageModule {}
