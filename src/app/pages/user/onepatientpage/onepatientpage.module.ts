import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { OnepatientpageComponent } from './onepatientpage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: OnepatientpageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [OnepatientpageComponent]
})
export class OnepatientpageModule {}
