import { Injectable } from '@angular/core';
import { Healthplace } from '../interfaces/healthplace.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthplaceService extends CrudService<Healthplace> {
	healthplaces: Healthplace[] = this.getDocs();
	constructor() {
		super({
			name: 'healthplace'
		});
	}
}
