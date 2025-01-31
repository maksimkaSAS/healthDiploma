import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { OnepagepatientComponent } from './onepagepatient.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: OnepagepatientComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [OnepagepatientComponent]
})
export class OnepagepatientModule {}
