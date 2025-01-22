import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CreatepatientComponent } from './createpatient.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CreatepatientComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CreatepatientComponent]
})
export class CreatepatientModule {}
