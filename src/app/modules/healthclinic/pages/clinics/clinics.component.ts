import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthclinicService } from '../../services/healthclinic.service';
import { Healthclinic } from '../../interfaces/healthclinic.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthclinicFormComponents } from '../../formcomponents/healthclinic.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './clinics.component.html',
	styleUrls: ['./clinics.component.scss'],
	standalone: false
})
export class ClinicsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'healthclinic',
		healthclinicFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthclinicService.setPerPage.bind(
			this._healthclinicService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Healthclinic>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Healthclinic);

					await firstValueFrom(
						this._healthclinicService.create(
							created as Healthclinic
						)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Healthclinic): void => {
			this._form
				.modal<Healthclinic>(this.form, [], doc)
				.then((updated: Healthclinic) => {
					this._core.copy(updated, doc);

					this._healthclinicService.update(doc);
				});
		},
		delete: (doc: Healthclinic): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthclinic?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._healthclinicService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'place',
				hrefFunc: (doc: Healthclinic): string => {
					return '/places/clinics/' + doc._id;
				}
			},

			{
				icon: 'health_and_safety',
				hrefFunc: (doc: Healthclinic): string => {
					return '/doctors/' + doc._id;
				}
			},

			{
				icon: 'comment',
				hrefFunc: (doc: Healthclinic): string => {
					return '/comments/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Healthclinic): void => {
					this._form.modalUnique<Healthclinic>(
						'healthclinic',
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

	rows: Healthclinic[] = [];

	constructor(
		private _translate: TranslateService,
		private _healthclinicService: HealthclinicService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._healthclinicService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Healthclinic>(create ? [] : this.rows)
				.then(async (healthclinics: Healthclinic[]) => {
					if (create) {
						for (const healthclinic of healthclinics) {
							this._preCreate(healthclinic);

							await firstValueFrom(
								this._healthclinicService.create(healthclinic)
							);
						}
					} else {
						for (const healthclinic of this.rows) {
							if (
								!healthclinics.find(
									(localHealthclinic) =>
										localHealthclinic._id ===
										healthclinic._id
								)
							) {
								await firstValueFrom(
									this._healthclinicService.delete(
										healthclinic
									)
								);
							}
						}

						for (const healthclinic of healthclinics) {
							const localHealthclinic = this.rows.find(
								(localHealthclinic) =>
									localHealthclinic._id === healthclinic._id
							);

							if (localHealthclinic) {
								this._core.copy(
									healthclinic,
									localHealthclinic
								);

								await firstValueFrom(
									this._healthclinicService.update(
										localHealthclinic
									)
								);
							} else {
								this._preCreate(healthclinic);

								await firstValueFrom(
									this._healthclinicService.create(
										healthclinic
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthclinic: Healthclinic): void {
		delete healthclinic.__created;
	}
}
