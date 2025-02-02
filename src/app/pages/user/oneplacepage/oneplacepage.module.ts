import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { OneplacepageComponent } from './oneplacepage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':place_id',
		component: OneplacepageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [OneplacepageComponent]
})
export class OneplacepageModule {}
