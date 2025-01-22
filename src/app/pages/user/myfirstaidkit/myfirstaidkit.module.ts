import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MyfirstaidkitComponent } from './myfirstaidkit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MyfirstaidkitComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MyfirstaidkitComponent]
})
export class MyfirstaidkitModule {}
