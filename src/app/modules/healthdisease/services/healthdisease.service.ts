import { Injectable } from '@angular/core';
import { Healthdisease } from '../interfaces/healthdisease.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class HealthdiseaseService extends CrudService<Healthdisease> {
	healthdiseases: Healthdisease[] = this.getDocs();

	healthdiseasesByAuthor: Record<string, Healthdisease[]> = {};

	constructor() {
		super({
			name: 'healthdisease'
		});

		this.get();

		this.filteredDocuments(this.healthdiseasesByAuthor);
	}
}
