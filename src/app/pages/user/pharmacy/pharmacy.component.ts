import { Component } from '@angular/core';
import { Healthpharmacy } from 'src/app/modules/healthpharmacy/interfaces/healthpharmacy.interface';
import { HealthpharmacyService } from 'src/app/modules/healthpharmacy/services/healthpharmacy.service';

@Component({
	templateUrl: './pharmacy.component.html',
	styleUrls: ['./pharmacy.component.scss'],
	standalone: false
})
export class PharmacyComponent {
	pharmacies: Healthpharmacy[] = [];

	constructor(private _healthpharmacyService: HealthpharmacyService) {}

	ngOnInit(): void {
		this._healthpharmacyService
			.get({}, { name: 'public' })
			.subscribe((pharmacies) => {
				this.pharmacies = pharmacies;
			});
	}

	isMenuOpen=false;
}
