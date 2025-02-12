import { Injectable } from '@angular/core';
import { Healthlink } from '../interfaces/healthlink.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthlinkService extends CrudService<Healthlink> {
	healthlinks: Healthlink[];
	constructor() {
		super({
			name: 'healthlink'
		});
	}
}
