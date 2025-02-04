import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HealthpharmacyService } from 'src/app/modules/healthpharmacy/services/healthpharmacy.service';

@Component({
	templateUrl: './onepharmacypage.component.html',
	styleUrls: ['./onepharmacypage.component.scss'],
	standalone: false
})
export class OnepharmacypageComponent {
	onepharmacy = this._healthpharmacyService.doc(
		this._router.url.replace('/onepharmacypage/', '')
	);

	constructor(
		private _healthpharmacyService: HealthpharmacyService,
		private _router: Router
	) {}

	isMenuOpen = false;

}
