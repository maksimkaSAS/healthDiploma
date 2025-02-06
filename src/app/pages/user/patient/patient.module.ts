import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PatientsComponent } from './patient.component';
import { Routes, RouterModule } from '@angular/router';
import { MypatientComponent } from './mypatient/mypatient.component';
import { SelectUserComponent } from 'src/app/modules/healthpatient/selectors/healthpatient/healthpatient-selector.component';

const routes: Routes = [
	{
		path: '',
		component: PatientsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PatientsComponent, MypatientComponent]
})
export class PatientsModule {}
