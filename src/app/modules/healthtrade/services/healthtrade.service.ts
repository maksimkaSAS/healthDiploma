import { Injectable } from '@angular/core';
import { Healthtrade } from '../interfaces/healthtrade.interface';
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
export class HealthtradeService extends CrudService<Healthtrade> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthtrade',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
