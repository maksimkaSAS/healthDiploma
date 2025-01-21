import { Injectable } from '@angular/core';
import { Healthpatient } from '../interfaces/healthpatient.interface';
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
export class HealthpatientService extends CrudService<Healthpatient> {
	healthpatients: Healthpatient[] = this.getDocs();

	healthpatientsByAuthor: Record<string, Healthpatient[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthpatient',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.healthpatientsByAuthor);
	}
}
