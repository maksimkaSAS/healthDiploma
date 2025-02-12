import { Injectable } from '@angular/core';
import { Healthdrug } from '../interfaces/healthdrug.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthdrugService extends CrudService<Healthdrug> {
	healthdrugs: Healthdrug[] = this.getDocs();

	healthdrugsByAuthor: Record<string, Healthdrug[]> = {};

	constructor() {
		super({
			name: 'healthdrug'
		});

		this.get();

		this.filteredDocuments(this.healthdrugsByAuthor);
	}
}
