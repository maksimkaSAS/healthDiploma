import { Injectable } from '@angular/core';
import { Healthdisease } from '../interfaces/healthdisease.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class HealthdiseaseService extends CrudService<Healthdisease> {
	healthdiseases: Healthdisease[] = this.getDocs();

	healthdiseasesByAuthor: Record<string, Healthdisease[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthdisease',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.healthdiseasesByAuthor);
	}
}
