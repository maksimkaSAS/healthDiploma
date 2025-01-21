import { Injectable } from '@angular/core';
import { Healthrecord } from '../interfaces/healthrecord.interface';
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
export class HealthrecordService extends CrudService<Healthrecord> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthrecord',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
