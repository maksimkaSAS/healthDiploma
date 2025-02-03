import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PatienthistoryComponent } from './patienthistory.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PatienthistoryComponent
	},

	{
		path: ':patient_id',
		component: PatienthistoryComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PatienthistoryComponent]
})
export class PatienthistoryModule {}
