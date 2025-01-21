import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthpatientService } from '../../services/healthpatient.service';
import { Healthpatient } from '../../interfaces/healthpatient.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthpatientFormComponents } from '../../formcomponents/healthpatient.formcomponents';

@Component({
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.scss'],
	standalone: false,
})
export class PatientsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('healthpatient', healthpatientFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Healthpatient>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Healthpatient);

					this._healthpatientService.create(created as Healthpatient);

					close();
				},
			});
		},
		update: (doc: Healthpatient): void => {
			this._form
				.modal<Healthpatient>(this.form, [], doc)
				.then((updated: Healthpatient) => {
					this._core.copy(updated, doc);

					this._healthpatientService.update(doc);
				});
		},
		delete: (doc: Healthpatient): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthpatient?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._healthpatientService.delete(doc);
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Healthpatient): void => {
					this._form.modalUnique<Healthpatient>('healthpatient', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	get rows(): Healthpatient[] {
		return this._healthpatientService.healthpatients;
	}

	constructor(
		private _translate: TranslateService,
		private _healthpatientService: HealthpatientService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Healthpatient>(create ? [] : this.rows)
				.then((healthpatients: Healthpatient[]) => {
					if (create) {
						for (const healthpatient of healthpatients) {
							this._preCreate(healthpatient);

							this._healthpatientService.create(healthpatient);
						}
					} else {
						for (const healthpatient of this.rows) {
							if (
								!healthpatients.find(
									(localHealthpatient) => localHealthpatient._id === healthpatient._id
								)
							) {
								this._healthpatientService.delete(healthpatient);
							}
						}

						for (const healthpatient of healthpatients) {
							const localHealthpatient = this.rows.find(
								(localHealthpatient) => localHealthpatient._id === healthpatient._id
							);

							if (localHealthpatient) {
								this._core.copy(healthpatient, localHealthpatient);

								this._healthpatientService.update(localHealthpatient);
							} else {
								this._preCreate(healthpatient);

								this._healthpatientService.create(healthpatient);
							}
						}
					}
				});
		};
	}

	private _preCreate(healthpatient: Healthpatient): void {
		delete healthpatient.__created;
	}
}
