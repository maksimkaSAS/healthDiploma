import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthpharmacyService } from '../../services/healthpharmacy.service';
import { Healthpharmacy } from '../../interfaces/healthpharmacy.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthpharmacyFormComponents } from '../../formcomponents/healthpharmacy.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './pharmacies.component.html',
	styleUrls: ['./pharmacies.component.scss'],
	standalone: false,
})
export class PharmaciesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('healthpharmacy', healthpharmacyFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthpharmacyService.setPerPage.bind(this._healthpharmacyService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Healthpharmacy>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Healthpharmacy);

					await firstValueFrom(
						this._healthpharmacyService.create(created as Healthpharmacy)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Healthpharmacy): void => {
			this._form
				.modal<Healthpharmacy>(this.form, [], doc)
				.then((updated: Healthpharmacy) => {
					this._core.copy(updated, doc);

					this._healthpharmacyService.update(doc);
				});
		},
		delete: (doc: Healthpharmacy): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthpharmacy?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._healthpharmacyService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Healthpharmacy): void => {
					this._form.modalUnique<Healthpharmacy>('healthpharmacy', 'url', doc);
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

	rows: Healthpharmacy[] = [];

	constructor(
		private _translate: TranslateService,
		private _healthpharmacyService: HealthpharmacyService,
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
				this._healthpharmacyService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Healthpharmacy>(create ? [] : this.rows)
				.then(async (healthpharmacys: Healthpharmacy[]) => {
					if (create) {
						for (const healthpharmacy of healthpharmacys) {
							this._preCreate(healthpharmacy);

							await firstValueFrom(
								this._healthpharmacyService.create(healthpharmacy)
							);
						}
					} else {
						for (const healthpharmacy of this.rows) {
							if (
								!healthpharmacys.find(
									(localHealthpharmacy) => localHealthpharmacy._id === healthpharmacy._id
								)
							) {
								await firstValueFrom(
									this._healthpharmacyService.delete(healthpharmacy)
								);
							}
						}

						for (const healthpharmacy of healthpharmacys) {
							const localHealthpharmacy = this.rows.find(
								(localHealthpharmacy) => localHealthpharmacy._id === healthpharmacy._id
							);

							if (localHealthpharmacy) {
								this._core.copy(healthpharmacy, localHealthpharmacy);

								await firstValueFrom(
									this._healthpharmacyService.update(localHealthpharmacy)
								);
							} else {
								this._preCreate(healthpharmacy);

								await firstValueFrom(
									this._healthpharmacyService.create(healthpharmacy)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthpharmacy: Healthpharmacy): void {
		delete healthpharmacy.__created;
	}
}
