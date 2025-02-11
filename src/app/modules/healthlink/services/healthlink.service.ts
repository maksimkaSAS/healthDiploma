import { Injectable } from '@angular/core';
import { Healthlink } from '../interfaces/healthlink.interface';
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
export class HealthlinkService extends CrudService<Healthlink> {
	healthlinks: Healthlink[];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthlink',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
