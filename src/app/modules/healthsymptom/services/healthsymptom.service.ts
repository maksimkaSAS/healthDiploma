import { Injectable } from '@angular/core';
import { Healthsymptom } from '../interfaces/healthsymptom.interface';
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
export class HealthsymptomService extends CrudService<Healthsymptom> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthsymptom',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
