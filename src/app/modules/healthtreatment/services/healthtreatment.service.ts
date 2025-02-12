import { Injectable } from '@angular/core';
import { Healthtreatment } from '../interfaces/healthtreatment.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthtreatmentService extends CrudService<Healthtreatment> {
	constructor() {
		super({
			name: 'healthtreatment'
		});
	}
}
