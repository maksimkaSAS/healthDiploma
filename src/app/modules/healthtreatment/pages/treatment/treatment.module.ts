import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TreatmentComponent } from './treatment.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TreatmentComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TreatmentComponent],
	providers: []
})
export class TreatmentModule {}
