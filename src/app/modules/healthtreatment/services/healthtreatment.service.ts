import { Injectable } from '@angular/core';
import { Healthtreatment } from '../interfaces/healthtreatment.interface';
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
export class HealthtreatmentService extends CrudService<Healthtreatment> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthtreatment',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
