import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HealthplaceService } from 'src/app/modules/healthplace/services/healthplace.service';

@Component({
	templateUrl: './oneplacepage.component.html',
	styleUrls: ['./oneplacepage.component.scss'],
	standalone: false
})
export class OneplacepageComponent {
	oneplace = this._healthplaceService.doc(
		this._router.url.replace('/oneplacepage/', '')
	);

	constructor(
		private _healthplaceService: HealthplaceService,
		private _router: Router
	) {}
}
