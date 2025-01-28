import { Component } from '@angular/core';
import { Healthpatient } from 'src/app/modules/healthpatient/interfaces/healthpatient.interface';
import { HealthpatientService } from 'src/app/modules/healthpatient/services/healthpatient.service';

@Component({
	templateUrl: './patient.component.html',
	styleUrls: ['./patient.component.scss'],
	standalone: false
})
export class PatientsComponent {
	get patient(): Healthpatient[] {
		return this._healthpatientService.healthpatients;
	}
	isMenuOpen=false;
	constructor(private _healthpatientService: HealthpatientService) {}
}
