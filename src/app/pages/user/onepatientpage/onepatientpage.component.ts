import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HealthpatientService } from 'src/app/modules/healthpatient/services/healthpatient.service';

@Component({
	templateUrl: './onepatientpage.component.html',
	styleUrls: ['./onepatientpage.component.scss'],
	standalone: false
})
export class OnepatientpageComponent {

	onepatient = this._healthpatientService.doc(
		this._router.url.replace('/onepatientpage/', '')
	);

	constructor(
		private _healthpatientService: HealthpatientService,
		private _router: Router
	) {}
}
