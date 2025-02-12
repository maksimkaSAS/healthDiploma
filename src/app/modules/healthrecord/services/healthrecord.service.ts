import { Injectable } from '@angular/core';
import { Healthrecord } from '../interfaces/healthrecord.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthrecordService extends CrudService<Healthrecord> {
	constructor() {
		super({
			name: 'healthrecord'
		});
	}
}
