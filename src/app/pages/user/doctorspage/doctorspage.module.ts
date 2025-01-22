import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DoctorspageComponent } from './doctorspage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DoctorspageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DoctorspageComponent]
})
export class DoctorspageModule {}
