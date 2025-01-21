import { Injectable } from '@angular/core';
import { Healthanalysis } from '../interfaces/healthanalysis.interface';
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
export class HealthanalysisService extends CrudService<Healthanalysis> {
	healthanalysiss: Healthanalysis[] = this.getDocs();

	healthanalysissByAuthor: Record<string, Healthanalysis[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthanalysis',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.healthanalysissByAuthor);
	}
}
