import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DiseasesComponent } from './diseases.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DiseasesComponent
	},

	{
		path: ':patient_id',
		component: DiseasesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DiseasesComponent],
	providers: []
})
export class DiseasesModule {}
