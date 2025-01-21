import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { AnalysisComponent } from './analysis.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: AnalysisComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [AnalysisComponent],
	providers: []
})
export class AnalysisModule {}
