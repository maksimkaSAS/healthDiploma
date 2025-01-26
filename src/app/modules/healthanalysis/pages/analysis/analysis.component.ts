import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthanalysisService } from '../../services/healthanalysis.service';
import { Healthanalysis } from '../../interfaces/healthanalysis.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthanalysisFormComponents } from '../../formcomponents/healthanalysis.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './analysis.component.html',
	styleUrls: ['./analysis.component.scss'],
	standalone: false
})
export class AnalysisComponent {
	patient_id = this._router.url.includes('analysis/')
		? this._router.url.replace('/analysis/', '')
		: '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'healthanalysis',
		healthanalysisFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Healthanalysis>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Healthanalysis);

					this._healthanalysisService.create(
						created as Healthanalysis
					);

					close();
				}
			});
		},
		update: (doc: Healthanalysis): void => {
			this._form
				.modal<Healthanalysis>(this.form, [], doc)
				.then((updated: Healthanalysis) => {
					this._core.copy(updated, doc);

					this._healthanalysisService.update(doc);
				});
		},
		delete: (doc: Healthanalysis): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthanalysis?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._healthanalysisService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'assignment',
				hrefFunc: (doc: Healthanalysis): string => {
					return '/records/' + doc.patient + '/analysis/' + doc._id;
				}
			},

			{
				icon: 'cloud_download',
				click: (doc: Healthanalysis): void => {
					this._form.modalUnique<Healthanalysis>(
						'healthanalysis',
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

	get rows(): Healthanalysis[] {
		return this._healthanalysisService.healthanalysiss;
	}

	constructor(
		private _translate: TranslateService,
		private _healthanalysisService: HealthanalysisService,
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
				this._healthanalysisService
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
				.modalDocs<Healthanalysis>(create ? [] : this.rows)
				.then((healthanalysiss: Healthanalysis[]) => {
					if (create) {
						for (const healthanalysis of healthanalysiss) {
							this._preCreate(healthanalysis);

							this._healthanalysisService.create(healthanalysis);
						}
					} else {
						for (const healthanalysis of this.rows) {
							if (
								!healthanalysiss.find(
									(localHealthanalysis) =>
										localHealthanalysis._id ===
										healthanalysis._id
								)
							) {
								this._healthanalysisService.delete(
									healthanalysis
								);
							}
						}

						for (const healthanalysis of healthanalysiss) {
							const localHealthanalysis = this.rows.find(
								(localHealthanalysis) =>
									localHealthanalysis._id ===
									healthanalysis._id
							);

							if (localHealthanalysis) {
								this._core.copy(
									healthanalysis,
									localHealthanalysis
								);

								this._healthanalysisService.update(
									localHealthanalysis
								);
							} else {
								this._preCreate(healthanalysis);

								this._healthanalysisService.create(
									healthanalysis
								);
							}
						}
					}
				});
		};
	}

	private _preCreate(healthanalysis: Healthanalysis): void {
		delete healthanalysis.__created;

		if (this.patient_id) {
			healthanalysis.patient = this.patient_id;
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
