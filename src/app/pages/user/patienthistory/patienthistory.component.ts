import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Healthrecord } from 'src/app/modules/healthrecord/interfaces/healthrecord.interface';
import { HealthrecordService } from 'src/app/modules/healthrecord/services/healthrecord.service';

@Component({
	templateUrl: './patienthistory.component.html',
	styleUrls: ['./patienthistory.component.scss'],
	standalone: false
})
export class PatienthistoryComponent {
	records: Healthrecord[] = [];

	patient_id = '';

	constructor(
		private _healthrecordService: HealthrecordService,
		private _route: ActivatedRoute
	) {
		this._route.paramMap.subscribe((params) => {
			this.patient_id = params.get('patient_id') || '';
		});
	}

	ngOnInit(): void {
		this._healthrecordService
			.get({ query: this._query() })
			.subscribe((records) => {
				this.records = records;
			});
	}

	private _query(): string {
		let query = '';
		if (this.patient_id) {
			query += (query ? '&' : '') + 'patient=' + this.patient_id;
		}

		return query;
	}

	isMenuOpen = false;
}
