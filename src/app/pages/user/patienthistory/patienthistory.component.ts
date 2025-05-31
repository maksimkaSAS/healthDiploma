import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormComponentInterface } from 'src/app/core/modules/form/interfaces/component.interface';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
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

	private _previousSelectedType: string | undefined = undefined;

	constructor(
		private _healthrecordService: HealthrecordService,
		private _route: ActivatedRoute,
		private _form: FormService,
		private translateService: TranslateService
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

	recordTypeList = [
		{ _id: 'Symptom', name: this.getTranslatedText('Record.Symptom') },

		{
			_id: 'Analysis',

			name: this.getTranslatedText('Record.Analysis')
		},

		{
			_id: 'Disease',

			name: this.getTranslatedText('Record.Disease')
		},

		{
			_id: 'Treatment',

			name: this.getTranslatedText('Record.Treatment')
		}
	];

	create(): void {
		// Ініціалізуємо об'єкт submition з типом
		const submition: {
			name: string;
			description: string;
			diagnosis: string;
			result: string;
			treatmentType: string;
			allergy: string;
		} = {
			name: '',
			description: '',
			diagnosis: '',
			result: '',
			treatmentType: '',
			allergy: ''
		};

		// Очищення та приховування полів
		const clearFields = () => {
			// Очищаємо всі поля форми
			submition.name = '';
			submition.description = '';
			submition.diagnosis = '';
			submition.result = '';
			submition.treatmentType = '';
			submition.allergy = '';

			// Сховуємо всі поля
			const nameField = this._form.getComponent(
				this.form,
				'name'
			) as FormComponentInterface;
			const descriptionField = this._form.getComponent(
				this.form,
				'description'
			) as FormComponentInterface;
			const diagnosisField = this._form.getComponent(
				this.form,
				'diagnosis'
			) as FormComponentInterface;
			const resultField = this._form.getComponent(
				this.form,
				'result'
			) as FormComponentInterface;
			const treatmentTypeField = this._form.getComponent(
				this.form,
				'treatmentType'
			) as FormComponentInterface;
			const allergiesField = this._form.getComponent(
				this.form,
				'allergy'
			) as FormComponentInterface;

			nameField.hidden = true;
			descriptionField.hidden = true;
			diagnosisField.hidden = true;
			resultField.hidden = true;
			treatmentTypeField.hidden = true;
			allergiesField.hidden = true;
		};

		this._form.modal<Healthrecord>(
			this.form,
			{
				label: 'Create',
				click: async (
					created: unknown,
					close: () => void
				): Promise<void> => {
					close();
					this._preCreate(created as Healthrecord);

					// Підготовка даних перед створенням
					this._healthrecordService
						.create(created as Healthrecord)
						.subscribe(() => {
							this.load();
						});

					// Очищаємо і приховуємо поля після створення
					clearFields();
				}
			},
			submition,
			(changed: Healthrecord) => {
				// Отримуємо значення "type", щоб визначити які поля показувати/ховати
				const selectedType = changed.type;

				// Доступ до компонентів форми
				const diagnosisField = this._form.getComponent(
					this.form,
					'diagnosis'
				) as FormComponentInterface;
				const resultField = this._form.getComponent(
					this.form,
					'result'
				) as FormComponentInterface;
				const treatmentTypeField = this._form.getComponent(
					this.form,
					'treatmentType'
				) as FormComponentInterface;
				const allergiesField = this._form.getComponent(
					this.form,
					'allergy'
				) as FormComponentInterface;
				const nameField = this._form.getComponent(
					this.form,
					'name'
				) as FormComponentInterface;
				const descriptionField = this._form.getComponent(
					this.form,
					'description'
				) as FormComponentInterface;

				// Очищаємо тільки при зміні типу (тобто коли змінюється type)
				const clearFields = () => {
					// Очищаємо всі поля форми
					submition.name = '';
					submition.description = '';
					submition.diagnosis = '';
					submition.result = '';
					submition.treatmentType = '';
					submition.allergy = '';
				};

				// Перевіряємо, чи змінився тип, якщо так, очищаємо поля
				if (selectedType !== this._previousSelectedType) {
					clearFields();
					this._previousSelectedType = selectedType; // Запам'ятовуємо попередній тип
				}

				// Визначаємо, які поля показати або приховати залежно від типу
				switch (selectedType) {
					case 'Symptom':
						nameField.hidden = false;
						descriptionField.hidden = false;
						diagnosisField.hidden = true;
						resultField.hidden = true;
						treatmentTypeField.hidden = true;
						allergiesField.hidden = true;
						break;

					case 'Analysis':
						nameField.hidden = false;
						descriptionField.hidden = false;
						diagnosisField.hidden = false;
						resultField.hidden = false;
						treatmentTypeField.hidden = true;
						allergiesField.hidden = true;
						break;

					case 'Disease':
						nameField.hidden = false;
						descriptionField.hidden = false;
						diagnosisField.hidden = false;
						resultField.hidden = false;
						treatmentTypeField.hidden = false;
						allergiesField.hidden = false;
						break;

					case 'Treatment':
						nameField.hidden = false;
						descriptionField.hidden = false;
						diagnosisField.hidden = true;
						resultField.hidden = false;
						allergiesField.hidden = true;
						treatmentTypeField.hidden = false;
						break;
				}
			}
		);
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

	getTranslatedText(toTranslate: string) {
		return this.translateService.translate(toTranslate);
	}

	isMenuOpen = false;
}
