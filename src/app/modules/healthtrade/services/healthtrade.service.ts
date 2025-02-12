import { Injectable } from '@angular/core';
import { Healthtrade } from '../interfaces/healthtrade.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthtradeService extends CrudService<Healthtrade> {
	constructor() {
		super({
			name: 'healthtrade'
		});
	}
}
