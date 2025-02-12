import { Injectable } from '@angular/core';
import { Healthcomment } from '../interfaces/healthcomment.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthcommentService extends CrudService<Healthcomment> {
	constructor() {
		super({
			name: 'healthcomment'
		});
	}
}
