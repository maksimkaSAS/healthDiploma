import { Injectable } from '@angular/core';
import { Healthdoctor } from '../interfaces/healthdoctor.interface';
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
export class HealthdoctorService extends CrudService<Healthdoctor> {
	healthdoctors: Healthdoctor[];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthdoctor',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
