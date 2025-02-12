import { Injectable } from '@angular/core';
import { Healthanalysis } from '../interfaces/healthanalysis.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthanalysisService extends CrudService<Healthanalysis> {
	healthanalysiss: Healthanalysis[] = this.getDocs();

	healthanalysissByAuthor: Record<string, Healthanalysis[]> = {};

	constructor() {
		super({
			name: 'healthanalysis'
		});

		this.get();

		this.filteredDocuments(this.healthanalysissByAuthor);
	}
}
