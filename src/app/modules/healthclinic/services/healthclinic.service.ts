import { Injectable } from '@angular/core';
import { Healthclinic } from '../interfaces/healthclinic.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthclinicService extends CrudService<Healthclinic> {
	healthclinics: Healthclinic[] = this.getDocs();

	// clinicsByAuthor: Record<string, Healthclinic[]> = {};

	constructor() {
		super({
			name: 'healthclinic'
		});
	}
}
