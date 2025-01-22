import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PharmaciespageComponent } from './pharmaciespage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PharmaciespageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PharmaciespageComponent]
})
export class PharmaciespageModule {}
