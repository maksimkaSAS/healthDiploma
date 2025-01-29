import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ClinicspageComponent } from './clinicspage.component';
import { Routes, RouterModule } from '@angular/router';
import { ClinicComponent } from './clinic/clinic.component';

const routes: Routes = [
	{
		path: '',
		component: ClinicspageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ClinicspageComponent, ClinicComponent]
})
export class ClinicspageModule {}
