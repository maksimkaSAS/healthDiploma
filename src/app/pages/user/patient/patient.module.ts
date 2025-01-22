import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PatientsComponent } from './patient.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PatientsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PatientsComponent]
})
export class PatientsModule {}
