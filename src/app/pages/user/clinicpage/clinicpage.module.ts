import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ClinicpageComponent } from './clinicpage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':clinic_id',
		component: ClinicpageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ClinicpageComponent]
})
export class ClinicpageModule {}
