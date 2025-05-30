import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Value } from 'src/app/core/modules/input/input.component';
import { healthpatientFormComponents } from 'src/app/modules/healthpatient/formcomponents/healthpatient.formcomponents';
import { Healthpatient } from 'src/app/modules/healthpatient/interfaces/healthpatient.interface';
import { HealthpatientService } from 'src/app/modules/healthpatient/services/healthpatient.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';

@Component({
	templateUrl: './patient.component.html',
	styleUrls: ['./patient.component.scss'],
	standalone: false
})
export class PatientsComponent {
	get patients(): Healthpatient[] {
		return this._healthpatientService.healthpatients;
	}

	gender = '';
	category = '';
	search = '';
	//gendersList: { _id: string; name: string }[] = [];

	load(): void {
		this._healthpatientService
			.get(
				{
					query: this._query()
				}
				// { name: 'public' }
			)
			.subscribe((patients) => {
				this.patients.splice(0, this.patients.length);
				// const patientGender = patients.filter(
				// 	(patients) => !this.gender || patients.gender === this.gender
				// );
				this.patients.push(...patients);
			});
	}

	setField(value: Value): void {
		this.search = (value as string) || '';
	}

	private _query(): string {
		let query = '';
		if (this.gender) {
			query += (query ? '&' : '') + 'gender=' + this.gender;
		}

		if (this.category) {
			query += (query ? '&' : '') + 'category=' + this.category;
		}

		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}
		return query;
	}

	form: FormInterface = this._form.getForm(
		'patient',
		healthpatientFormComponents
	);
	isMenuOpen = false;
	constructor(
		private _healthpatientService: HealthpatientService,
		private _form: FormService,
		private translateService: TranslateService
	) {}

	create(): void {
		this._form.modal<Healthpatient>(this.form, {
			label: 'Create',
			click: (created: unknown, close: () => void) => {
				this._healthpatientService.create(created as Healthpatient);

				close();
			}
		});
	}

	genderList = [
		{ _id: 'Male', name: this.getTranslatedText('Patient.Male') },

		{
			_id: 'Female',

			name: this.getTranslatedText('Patient.Female')
		}
	];

	categoryList = [
		{ _id: 'Child', name: this.getTranslatedText('Patient.Child') },

		{
			_id: 'Adult',

			name: this.getTranslatedText('Patient.Adult')
		},

		{
			_id: 'Elderly',

			name: this.getTranslatedText('Patient.Elderly')
		}
	];

	getTranslatedText(toTranslate: string) {
		return this.translateService.translate(toTranslate);
	}
}
