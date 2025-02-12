import { Injectable } from '@angular/core';
import { Healthpatient } from '../interfaces/healthpatient.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthpatientService extends CrudService<Healthpatient> {
	healthpatients: Healthpatient[] = this.getDocs();

	healthpatientsByAuthor: Record<string, Healthpatient[]> = {};

	constructor() {
		super({
			name: 'healthpatient'
		});

		this.get();

		this.filteredDocuments(this.healthpatientsByAuthor);
	}
}
