import { Component } from '@angular/core';
import { Healthclinic } from 'src/app/modules/healthclinic/interfaces/healthclinic.interface';
import { HealthclinicService } from 'src/app/modules/healthclinic/services/healthclinic.service';

@Component({
	templateUrl: './clinicspage.component.html',
	styleUrls: ['./clinicspage.component.scss'],
	standalone: false
})
export class ClinicspageComponent {
	clinics: Healthclinic[] = [];

	constructor(private _healthclinicService: HealthclinicService) {}

	ngOnInit(): void {
		this._healthclinicService
			.get({}, { name: 'public' })
			.subscribe((clinics) => {
				this.clinics = clinics;
			});
	}

	isMenuOpen=false;
}
