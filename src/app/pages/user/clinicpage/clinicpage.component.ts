import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HealthclinicService } from 'src/app/modules/healthclinic/services/healthclinic.service';

@Component({
	templateUrl: './clinicpage.component.html',
	styleUrls: ['./clinicpage.component.scss'],
	standalone: false
})
export class ClinicpageComponent {

	oneclinic = this._healthclinicService.doc(
			this._router.url.replace('/clinicpage/', '')
		);
	
		constructor(
			private _healthclinicService: HealthclinicService,
			private _router: Router
		) {}
}
