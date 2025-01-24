import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommentsComponent } from './comments.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommentsComponent
	},

	{
		path: ':clinic_id',
		component: CommentsComponent
	},

	{
		path: ':clinic_id/doctors/:doctor_id',
		component: CommentsComponent
	},

	{
		path: ':clinic_id/pharmacies/:pharmacy_id',
		component: CommentsComponent
	},

	{
		path: ':clinic_id/places/:place_id',
		component: CommentsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommentsComponent],
	providers: []
})
export class CommentsModule {}
