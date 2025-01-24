import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { RecordsComponent } from './records.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: RecordsComponent
	},

	{
		path: ':patient_id',
		component: RecordsComponent
	},

	{
		path: ':patient_id/diseases/:disease_id',
		component: RecordsComponent
	},

	{
		path: ':patient_id/treatment/:treatment_id',
		component: RecordsComponent
	},

	{
		path: ':patient_id/doctors/:doctor_id',
		component: RecordsComponent
	},

	{
		path: ':patient_id/symptoms/:symptom_id',
		component: RecordsComponent
	},

	{
		path: ':patient_id/analysis/:analysis_id',
		component: RecordsComponent
	}

	/*{
		path: ':disease_id',
		component: RecordsComponent
	}*/
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [RecordsComponent],
	providers: []
})
export class RecordsModule {}
