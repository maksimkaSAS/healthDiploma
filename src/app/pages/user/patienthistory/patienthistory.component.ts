import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthrecordFormComponents } from 'src/app/modules/healthrecord/formcomponents/healthrecord.formcomponents';
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
	type = '';

	form: FormInterface = this._form.getForm(
		'record',
		healthrecordFormComponents
	);

	constructor(
		private _healthrecordService: HealthrecordService,
		private _route: ActivatedRoute,
		private _form: FormService
	) {
		this._route.paramMap.subscribe((params) => {
			this.patient_id = params.get('patient_id') || '';
			this.load();
		});
	}

	load(): void {
		this._healthrecordService
			.get({ page: 1, query: this._query() })
			.subscribe((records) => {
				this.records.splice(0, this.records.length);
				this.records.push(...records);
			});
	}

	create(): void {
		this._form.modal<Healthrecord>(this.form, {
			label: 'Create',
			click: async (
				created: unknown,
				close: () => void
			): Promise<void> => {
				close();
				this._preCreate(created as Healthrecord);

				this._healthrecordService
					.create(created as Healthrecord)
					.subscribe(() => {
						this.load();
					});
			}
		});

		/*ngOnInit(): void {
		this._healthrecordService
			.get({ query: this._query() })
			.subscribe((records) => {
				this.records = records;
			});
	}*/
	}
	private _query(): string {
		let query = '';
		if (this.patient_id) {
			query += (query ? '&' : '') + 'patient=' + this.patient_id;
		}

		if (this.type) {
			query += (query ? '&' : '') + 'type=' + this.type;
		}

		return query;
	}
	private _preCreate(healthpatient: Healthrecord): void {
		delete healthpatient.__created;

		if (this.patient_id) {
			healthpatient.patient = this.patient_id;
		}

		if (this.type) {
			healthpatient.type = this.type;
		}
	}

	isMenuOpen = false;
}
