import { Injectable } from '@angular/core';
import { Healthrecord } from '../interfaces/healthrecord.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthrecordService extends CrudService<Healthrecord> {
	components: any;
	healthrecords: Healthrecord[] = this.getDocs();
	constructor() {
		super({
			name: 'healthrecord'
		});
	}
}
