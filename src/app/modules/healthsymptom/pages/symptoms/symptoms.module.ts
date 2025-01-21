import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SymptomsComponent } from './symptoms.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SymptomsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SymptomsComponent],
	providers: []
})
export class SymptomsModule {}
