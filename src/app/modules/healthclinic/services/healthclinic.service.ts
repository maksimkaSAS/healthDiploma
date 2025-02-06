import { Injectable } from '@angular/core';
import { Healthclinic } from '../interfaces/healthclinic.interface';
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
export class HealthclinicService extends CrudService<Healthclinic> {
	healthclinics: Healthclinic[] = this.getDocs();
	
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'healthclinic',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
