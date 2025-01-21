import { Injectable } from '@angular/core';
import { Healthdrug } from '../interfaces/healthdrug.interface';
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
export class HealthdrugService extends CrudService<Healthdrug> {
	healthdrugs: Healthdrug[] = this.getDocs();

	healthdrugsByAuthor: Record<string, Healthdrug[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthdrug',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.healthdrugsByAuthor);
	}
}
