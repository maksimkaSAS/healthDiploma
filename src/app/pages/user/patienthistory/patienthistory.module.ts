import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PatienthistoryComponent } from './patienthistory.component';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
	
	{
		path: ':patient_id',
		component: PatienthistoryComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PatienthistoryComponent, HistoryComponent]
})
export class PatienthistoryModule {}
