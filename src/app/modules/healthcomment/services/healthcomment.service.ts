import { Injectable } from '@angular/core';
import { Healthcomment } from '../interfaces/healthcomment.interface';
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
export class HealthcommentService extends CrudService<Healthcomment> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthcomment',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
