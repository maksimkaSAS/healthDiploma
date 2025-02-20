import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthrecordService } from '../../services/healthrecord.service';
import { Healthrecord } from '../../interfaces/healthrecord.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthrecordFormComponents } from '../../formcomponents/healthrecord.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponentInterface } from 'src/app/core/modules/form/interfaces/component.interface';
// import { DatePipe } from '@angular/common';

@Component({
	templateUrl: './records.component.html',
	styleUrls: ['./records.component.scss'],
	standalone: false
})
export class RecordsComponent {
	//disease_id = this._router.url.includes('diseases/') ? this._router.url.replace('/diseases/', '') : '';
	columns = [
		'name',
		'description',
		'diagnosis',
		'allergy',
		'result',
		'treatmentType'
	];

	form: FormInterface = this._form.getForm(
		'healthrecord',
		healthrecordFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthrecordService.setPerPage.bind(
			this._healthrecordService
		),
		allDocs: false,
		create: this._router.url.includes('records/')
			? (): void => {
					const submition = {};
					this._form.modal<Healthrecord>(
						this.form,
						{
							label: 'Create',
							click: async (
								created: unknown,
								close: () => void
							) => {
								close();

								this._preCreate(created as Healthrecord);

								await firstValueFrom(
									this._healthrecordService.create(
										created as Healthrecord
									)
								);

								this.setRows();
							}
						},
						submition,
						(changed: Healthrecord) => {
							// Access the "type" value to determine which fields to show/hide
							const selectedType = changed.type;

							// Accessing the individual form components
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

							// Hide or show fields based on selected type
							switch (selectedType) {
								case 'Symptom':
									// Hide diagnosis, result, and treatmentType fields
									diagnosisField.hidden = true;
									resultField.hidden = true;
									treatmentTypeField.hidden = true;
									break;

								case 'Analysis':
									// Show diagnosis and result, hide treatmentType
									diagnosisField.hidden = false;
									resultField.hidden = false;
									treatmentTypeField.hidden = true;
									break;

								case 'Disease':
									// Show diagnosis, result, and treatmentType
									diagnosisField.hidden = false;
									resultField.hidden = false;
									treatmentTypeField.hidden = false;
									break;

								case 'Treatment':
									// Show diagnosis, result, and treatmentType
									diagnosisField.hidden = false;
									resultField.hidden = false;
									treatmentTypeField.hidden = false;
									break;

								default:
									// Default case, hide all if no valid type is selected
									diagnosisField.hidden = true;
									resultField.hidden = true;
									treatmentTypeField.hidden = true;
									break;
							}

							// You can add any additional logic here based on your use case (e.g., handle form submission, validations, etc.)
						}
					);
			  }
			: null,
		update: (doc: Healthrecord): void => {
			this._form
				.modal<Healthrecord>(this.form, [], doc)
				.then((updated: Healthrecord) => {
					this._core.copy(updated, doc);

					this._healthrecordService.update(doc);
				});
		},
		delete: (doc: Healthrecord): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthrecord?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._healthrecordService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			// {
			// 	icon: 'sick',
			// 	hrefFunc: (doc: Healthrecord): string => {
			// 		return '/diseases/' + doc._id;
			// 	}
			// },

			{
				icon: 'cloud_download',
				click: (doc: Healthrecord): void => {
					this._form.modalUnique<Healthrecord>(
						'healthrecord',
						'url',
						doc
					);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Healthrecord[] = [];

	patient_id = '';
	disease_id = '';
	treatment_id = '';
	doctor_id = '';
	symptom_id = '';
	analysis_id = '';
	clinic_id = '';
	//disease_id = '';

	constructor(
		private _translate: TranslateService,
		private _healthrecordService: HealthrecordService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _route: ActivatedRoute // private datePipe: DatePipe
	) {
		this._route.paramMap.subscribe((params) => {
			this.patient_id = params.get('patient_id') || '';
			this.disease_id = params.get('disease_id') || '';
			this.treatment_id = params.get('treatment_id') || '';
			this.doctor_id = params.get('doctor_id') || '';
			this.symptom_id = params.get('symptom_id') || '';
			this.analysis_id = params.get('analysis_id') || '';
			this.clinic_id = params.get('clinic_id') || '';
		});

		this.setRows();
		console.log(this.patient_id);

		/*this._route.paramMap.subscribe(params => {this.disease_id = params.get('disease_id') || ''});
		console.log(this.disease_id);*/

		// this._healthrecordService
		// 	.get({}, { name: 'type' })
		// 	.subscribe((type) => {
		// 		const currentType = healthrecordFormComponents.components[0]
		// 			.fields[1].value as Array<Healthrecord>;

		// 		currentType.splice(0, currentType.length);

		// 		currentType.push(...type);
		// 		//console.log(type);
		// 		console.log(currentType);
		// 	});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._healthrecordService
					.get({ page, query: this._query() })
					.subscribe((rows) => {
						this.rows.splice(0, this.rows.length);

						this.rows.push(...rows);
					});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Healthrecord>(create ? [] : this.rows)
				.then(async (healthrecords: Healthrecord[]) => {
					if (create) {
						for (const healthrecord of healthrecords) {
							this._preCreate(healthrecord);

							await firstValueFrom(
								this._healthrecordService.create(healthrecord)
							);
						}
					} else {
						for (const healthrecord of this.rows) {
							if (
								!healthrecords.find(
									(localHealthrecord) =>
										localHealthrecord._id ===
										healthrecord._id
								)
							) {
								await firstValueFrom(
									this._healthrecordService.delete(
										healthrecord
									)
								);
							}
						}

						for (const healthrecord of healthrecords) {
							const localHealthrecord = this.rows.find(
								(localHealthrecord) =>
									localHealthrecord._id === healthrecord._id
							);

							if (localHealthrecord) {
								this._core.copy(
									healthrecord,
									localHealthrecord
								);

								await firstValueFrom(
									this._healthrecordService.update(
										localHealthrecord
									)
								);
							} else {
								this._preCreate(healthrecord);

								await firstValueFrom(
									this._healthrecordService.create(
										healthrecord
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthrecord: Healthrecord): void {
		healthrecord.__created = false;
		if (this.patient_id) {
			healthrecord.patient = this.patient_id;
		}

		if (this.disease_id) {
			healthrecord.disease = this.disease_id;
		}

		if (this.treatment_id) {
			healthrecord.treatment = this.treatment_id;
		}

		if (this.doctor_id) {
			healthrecord.doctor = this.doctor_id;
		}

		if (this.symptom_id) {
			healthrecord.symptom = this.symptom_id;
		}

		if (this.analysis_id) {
			healthrecord.analysis = this.analysis_id;
		}

		if (this.clinic_id) {
			healthrecord.clinic = this.clinic_id;
		}

		//  if(this.disease_id) {
		// 	healthrecord.healthdisease = this.disease_id;

		//  }
	}

	private _query(): string {
		let query = '';
		if (this.patient_id) {
			query += (query ? '&' : '') + 'patient=' + this.patient_id;
		}

		if (this.disease_id) {
			query += (query ? '&' : '') + 'disease=' + this.disease_id;
		}

		if (this.treatment_id) {
			query += (query ? '&' : '') + 'treatment=' + this.treatment_id;
		}

		if (this.doctor_id) {
			query += (query ? '&' : '') + 'doctor=' + this.doctor_id;
		}

		if (this.symptom_id) {
			query += (query ? '&' : '') + 'symptom=' + this.symptom_id;
		}

		if (this.analysis_id) {
			query += (query ? '&' : '') + 'analysis=' + this.analysis_id;
		}

		if (this.clinic_id) {
			query += (query ? '&' : '') + 'clinic=' + this.clinic_id;
		}

		/*	if (this.disease_id) {
			query += (query ? '&' : '') + 'disease=' + this.disease_id;
		}*/
		return query;
	}
}
