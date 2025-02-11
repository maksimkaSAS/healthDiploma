import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthplaceService } from '../../services/healthplace.service';
import { Healthplace } from '../../interfaces/healthplace.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthplaceFormComponents } from '../../formcomponents/healthplace.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './places.component.html',
	styleUrls: ['./places.component.scss'],
	standalone: false
})
export class PlacesComponent {
	/*drug_id = this._router.url.includes('drugs/')
		? this._router.url.replace('/drugs/', '')
		: '';*/
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'healthplace',
		healthplaceFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthplaceService.setPerPage.bind(
			this._healthplaceService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Healthplace>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Healthplace);

					await firstValueFrom(
						this._healthplaceService.create(created as Healthplace)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Healthplace): void => {
			this._form
				.modal<Healthplace>(this.form, [], doc)
				.then((updated: Healthplace) => {
					this._core.copy(updated, doc);

					this._healthplaceService.update(doc);
				});
		},
		delete: (doc: Healthplace): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthplace?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._healthplaceService.delete(doc)
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
				hrefFunc: (doc: Healthplace): string => {
					return '/comments/' + doc.clinic + '/places/' + doc._id;
				}
			},

			{
				icon: 'store',
				hrefFunc: (doc: Healthplace): string => {
					return '/trade/' + doc._id;
				}
			},

			{
				icon: 'cloud_download',
				click: (doc: Healthplace): void => {
					this._form.modalUnique<Healthplace>(
						'healthplace',
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

	rows: Healthplace[] = [];

	clinic_id = '';
	pharmacy_id = '';
	drug_id = '';
	link_id = '';

	constructor(
		private _translate: TranslateService,
		private _healthplaceService: HealthplaceService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _route: ActivatedRoute
	) {
		
		this._route.paramMap.subscribe((params) => {
			this.clinic_id = params.get('clinic_id') || '';
			this.pharmacy_id = params.get('pharmacy_id') || '';
			this.drug_id = params.get('drug_id') || '';
			this.link_id = params.get('link_id') || '';
			
		});
		this.setRows();
	}
	

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._healthplaceService
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
				.modalDocs<Healthplace>(create ? [] : this.rows)
				.then(async (healthplaces: Healthplace[]) => {
					if (create) {
						for (const healthplace of healthplaces) {
							this._preCreate(healthplace);

							await firstValueFrom(
								this._healthplaceService.create(healthplace)
							);
						}
					} else {
						for (const healthplace of this.rows) {
							if (
								!healthplaces.find(
									(localHealthplace) =>
										localHealthplace._id === healthplace._id
								)
							) {
								await firstValueFrom(
									this._healthplaceService.delete(healthplace)
								);
							}
						}

						for (const healthplace of healthplaces) {
							const localHealthplace = this.rows.find(
								(localHealthplace) =>
									localHealthplace._id === healthplace._id
							);

							if (localHealthplace) {
								this._core.copy(healthplace, localHealthplace);

								await firstValueFrom(
									this._healthplaceService.update(
										localHealthplace
									)
								);
							} else {
								this._preCreate(healthplace);

								await firstValueFrom(
									this._healthplaceService.create(healthplace)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthplace: Healthplace): void {
		delete healthplace.__created;
		if (this.clinic_id) {
			healthplace.clinic = this.clinic_id;
		}

		if (this.pharmacy_id) {
			healthplace.pharmacy = this.pharmacy_id;
		}

		if (this.drug_id) {
			healthplace.drug = this.drug_id;
		}

		if (this.link_id) {
			healthplace.link = this.link_id;
		}
	}

	private _query(): string {
		let query = '';
		if (this.clinic_id) {
			query += (query ? '&' : '') + 'clinic=' + this.clinic_id;
		}

		if (this.pharmacy_id) {
			query += (query ? '&' : '') + 'pharmacy=' + this.pharmacy_id;
		}

		if (this.drug_id) {
			query += (query ? '&' : '') + 'drug=' + this.drug_id;
		}

		if (this.link_id) {
			query += (query ? '&' : '') + 'link=' + this.link_id;
		}

		return query;
	}
}
