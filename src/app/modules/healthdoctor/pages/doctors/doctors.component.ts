import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthdoctorService } from '../../services/healthdoctor.service';
import { Healthdoctor } from '../../interfaces/healthdoctor.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthdoctorFormComponents } from '../../formcomponents/healthdoctor.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	templateUrl: './doctors.component.html',
	styleUrls: ['./doctors.component.scss'],
	standalone: false
})
export class DoctorsComponent {
	clinic_id = this._router.url.includes('doctors/')
		? this._router.url.replace('/doctors/', '')
		: '';
	/*patient_id = this._router.url.includes('doctors/')
		? this._router.url.replace('/doctors/', '')
		: '';*/
	columns = ['name', 'description', 'phone', 'specialty', 'experienceYears', 'consultationFee'];

	form: FormInterface = this._form.getForm(
		'healthdoctor',
		healthdoctorFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthdoctorService.setPerPage.bind(
			this._healthdoctorService
		),
		allDocs: false,
		create: this._router.url.includes('doctors/')
			? (): void => {
					this._form.modal<Healthdoctor>(this.form, {
						label: 'Create',
						click: async (created: unknown, close: () => void) => {
							close();

							this._preCreate(created as Healthdoctor);

							await firstValueFrom(
								this._healthdoctorService.create(
									created as Healthdoctor
								)
							);

							this.setRows();
						}
					});
			  }
			: null,
		update: (doc: Healthdoctor): void => {
			this._form
				.modal<Healthdoctor>(this.form, [], doc)
				.then((updated: Healthdoctor) => {
					this._core.copy(updated, doc);

					this._healthdoctorService.update(doc);
				});
		},
		delete: (doc: Healthdoctor): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthdoctor?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._healthdoctorService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'comment',
				hrefFunc: (doc: Healthdoctor): string => {
					return '/comments/' + doc.clinic + '/doctors/' + doc._id;
				}
			},

			/*{
				icon: 'assignment',
				hrefFunc: (doc: Healthdoctor): string => {
					return '/records/' + doc.patient + '/doctors/' + doc._id;
				}
			},*/

			{
				icon: 'cloud_download',
				click: (doc: Healthdoctor): void => {
					this._form.modalUnique<Healthdoctor>(
						'healthdoctor',
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

	rows: Healthdoctor[] = [];

	constructor(
		private _translate: TranslateService,
		private _healthdoctorService: HealthdoctorService,
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
				this._healthdoctorService
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
				.modalDocs<Healthdoctor>(create ? [] : this.rows)
				.then(async (healthdoctors: Healthdoctor[]) => {
					if (create) {
						for (const healthdoctor of healthdoctors) {
							this._preCreate(healthdoctor);

							await firstValueFrom(
								this._healthdoctorService.create(healthdoctor)
							);
						}
					} else {
						for (const healthdoctor of this.rows) {
							if (
								!healthdoctors.find(
									(localHealthdoctor) =>
										localHealthdoctor._id ===
										healthdoctor._id
								)
							) {
								await firstValueFrom(
									this._healthdoctorService.delete(
										healthdoctor
									)
								);
							}
						}

						for (const healthdoctor of healthdoctors) {
							const localHealthdoctor = this.rows.find(
								(localHealthdoctor) =>
									localHealthdoctor._id === healthdoctor._id
							);

							if (localHealthdoctor) {
								this._core.copy(
									healthdoctor,
									localHealthdoctor
								);

								await firstValueFrom(
									this._healthdoctorService.update(
										localHealthdoctor
									)
								);
							} else {
								this._preCreate(healthdoctor);

								await firstValueFrom(
									this._healthdoctorService.create(
										healthdoctor
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthdoctor: Healthdoctor): void {
		delete healthdoctor.__created;
		healthdoctor.__created = false;
		if (this.clinic_id) {
			healthdoctor.clinic = this.clinic_id;
		}

	/*	if (this.patient_id) {
			healthdoctor.patient = this.patient_id;
		}*/
	}

	private _query(): string {
		let query = '';
		if (this.clinic_id) {
			query += (query ? '&' : '') + 'clinic=' + this.clinic_id;
		}

		/*if (this.patient_id) {
			query += (query ? '&' : '') + 'clinic=' + this.patient_id;
		}*/

		return query;
	}
}
