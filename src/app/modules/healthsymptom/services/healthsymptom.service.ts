import { Injectable } from '@angular/core';
import { Healthsymptom } from '../interfaces/healthsymptom.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthsymptomService extends CrudService<Healthsymptom> {
	constructor() {
		super({
			name: 'healthsymptom'
		});
	}
}
