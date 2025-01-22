import { Injectable } from '@angular/core';
import { Healthplace } from '../interfaces/healthplace.interface';
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
export class HealthplaceService extends CrudService<Healthplace> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthplace',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
