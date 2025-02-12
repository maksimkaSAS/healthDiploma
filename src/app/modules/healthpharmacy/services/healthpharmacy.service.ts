import { Injectable } from '@angular/core';
import { Healthpharmacy } from '../interfaces/healthpharmacy.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthpharmacyService extends CrudService<Healthpharmacy> {
	healthpharmacy: Healthpharmacy[] = this.getDocs();
	constructor() {
		super({
			name: 'healthpharmacy'
		});
	}
}
