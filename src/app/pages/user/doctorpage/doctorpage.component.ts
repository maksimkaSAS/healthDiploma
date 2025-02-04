import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HealthdoctorService } from 'src/app/modules/healthdoctor/services/healthdoctor.service';

@Component({
	templateUrl: './doctorpage.component.html',
	styleUrls: ['./doctorpage.component.scss'],
	standalone: false
})
export class DoctorpageComponent {
	onedoctor = this._healthdoctorService.doc(
			this._router.url.replace('/doctorpage/', '')
		);
	
		constructor(
			private _healthdoctorService: HealthdoctorService,
			private _router: Router
		) {}

		isMenuOpen = false;
}
