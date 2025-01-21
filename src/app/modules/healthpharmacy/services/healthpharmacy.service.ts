import { Injectable } from '@angular/core';
import { Healthpharmacy } from '../interfaces/healthpharmacy.interface';
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
export class HealthpharmacyService extends CrudService<Healthpharmacy> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthpharmacy',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
