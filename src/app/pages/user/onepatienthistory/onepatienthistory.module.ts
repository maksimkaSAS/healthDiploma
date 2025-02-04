import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { OnepatienthistoryComponent } from './onepatienthistory.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':record_id',
		component: OnepatienthistoryComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [OnepatienthistoryComponent]
})
export class OnepatienthistoryModule {}
