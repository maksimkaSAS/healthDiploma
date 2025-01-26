import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthdiseaseService } from '../../services/healthdisease.service';
import { Healthdisease } from '../../interfaces/healthdisease.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthdiseaseFormComponents } from '../../formcomponents/healthdisease.formcomponents';
import { Route, Router } from '@angular/router';

@Component({
	templateUrl: './diseases.component.html',
	styleUrls: ['./diseases.component.scss'],
	standalone: false
})
export class DiseasesComponent {
	patient_id = this._router.url.includes('diseases/')
		? this._router.url.replace('/diseases/', '')
		: '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'healthdisease',
		healthdiseaseFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Healthdisease>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Healthdisease);

					this._healthdiseaseService.create(created as Healthdisease);

					close();
				}
			});
		},
		update: (doc: Healthdisease): void => {
			this._form
				.modal<Healthdisease>(this.form, [], doc)
				.then((updated: Healthdisease) => {
					this._core.copy(updated, doc);

					this._healthdiseaseService.update(doc);
				});
		},
		delete: (doc: Healthdisease): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthdisease?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._healthdiseaseService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			/*{
				icon: 'assignment',
				hrefFunc: (doc: Healthdisease): string => {
					return '/records/' + doc._id;
				},
			},*/

			{
				icon: 'assignment',
				hrefFunc: (doc: Healthdisease): string => {
					return '/records/' + doc.patient + '/diseases/' + doc._id;
				}
			},

			{
				icon: 'cloud_download',
				click: (doc: Healthdisease): void => {
					this._form.modalUnique<Healthdisease>(
						'healthdisease',
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

	get rows(): Healthdisease[] {
		return this._healthdiseaseService.healthdiseases;
	}

	constructor(
		private _translate: TranslateService,
		private _healthdiseaseService: HealthdiseaseService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._healthdiseaseService
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
				.modalDocs<Healthdisease>(create ? [] : this.rows)
				.then((healthdiseases: Healthdisease[]) => {
					if (create) {
						for (const healthdisease of healthdiseases) {
							this._preCreate(healthdisease);

							this._healthdiseaseService.create(healthdisease);
						}
					} else {
						for (const healthdisease of this.rows) {
							if (
								!healthdiseases.find(
									(localHealthdisease) =>
										localHealthdisease._id ===
										healthdisease._id
								)
							) {
								this._healthdiseaseService.delete(
									healthdisease
								);
							}
						}

						for (const healthdisease of healthdiseases) {
							const localHealthdisease = this.rows.find(
								(localHealthdisease) =>
									localHealthdisease._id === healthdisease._id
							);

							if (localHealthdisease) {
								this._core.copy(
									healthdisease,
									localHealthdisease
								);

								this._healthdiseaseService.update(
									localHealthdisease
								);
							} else {
								this._preCreate(healthdisease);

								this._healthdiseaseService.create(
									healthdisease
								);
							}
						}
					}
				});
		};
	}

	private _preCreate(healthdisease: Healthdisease): void {
		delete healthdisease.__created;

		if (this.patient_id) {
			healthdisease.patient = this.patient_id;
		}
	}

	private _query(): string {
		let query = '';
		if (this.patient_id) {
			query += (query ? '&' : '') + 'patient=' + this.patient_id;
		}

		return query;
	}
}
