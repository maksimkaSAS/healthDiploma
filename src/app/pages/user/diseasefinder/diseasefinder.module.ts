import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DiseasefinderComponent } from './diseasefinder.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DiseasefinderComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DiseasefinderComponent]
})
export class DiseasefinderModule {}
