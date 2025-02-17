import { Injectable } from '@angular/core';
import { Healthrecord } from '../interfaces/healthrecord.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthrecordService extends CrudService<Healthrecord> {
	components: any;
	constructor() {
		super({
			name: 'healthrecord'
		});
	}
}
