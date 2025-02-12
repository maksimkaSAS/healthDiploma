import { Injectable } from '@angular/core';
import { Healthdoctor } from '../interfaces/healthdoctor.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthdoctorService extends CrudService<Healthdoctor> {
	healthdoctors: Healthdoctor[];
	constructor() {
		super({
			name: 'healthdoctor'
		});
	}
}
