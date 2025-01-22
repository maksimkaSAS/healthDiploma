import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PatientprofileComponent } from './patientprofile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PatientprofileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PatientprofileComponent]
})
export class PatientprofileModule {}
