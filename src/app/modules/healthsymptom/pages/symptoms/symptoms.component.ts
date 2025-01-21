import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthsymptomService } from '../../services/healthsymptom.service';
import { Healthsymptom } from '../../interfaces/healthsymptom.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthsymptomFormComponents } from '../../formcomponents/healthsymptom.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './symptoms.component.html',
	styleUrls: ['./symptoms.component.scss'],
	standalone: false,
})
export class SymptomsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('healthsymptom', healthsymptomFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthsymptomService.setPerPage.bind(this._healthsymptomService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Healthsymptom>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Healthsymptom);

					await firstValueFrom(
						this._healthsymptomService.create(created as Healthsymptom)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Healthsymptom): void => {
			this._form
				.modal<Healthsymptom>(this.form, [], doc)
				.then((updated: Healthsymptom) => {
					this._core.copy(updated, doc);

					this._healthsymptomService.update(doc);
				});
		},
		delete: (doc: Healthsymptom): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthsymptom?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._healthsymptomService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Healthsymptom): void => {
					this._form.modalUnique<Healthsymptom>('healthsymptom', 'url', doc);
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

	rows: Healthsymptom[] = [];

	constructor(
		private _translate: TranslateService,
		private _healthsymptomService: HealthsymptomService,
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
				this._healthsymptomService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Healthsymptom>(create ? [] : this.rows)
				.then(async (healthsymptoms: Healthsymptom[]) => {
					if (create) {
						for (const healthsymptom of healthsymptoms) {
							this._preCreate(healthsymptom);

							await firstValueFrom(
								this._healthsymptomService.create(healthsymptom)
							);
						}
					} else {
						for (const healthsymptom of this.rows) {
							if (
								!healthsymptoms.find(
									(localHealthsymptom) => localHealthsymptom._id === healthsymptom._id
								)
							) {
								await firstValueFrom(
									this._healthsymptomService.delete(healthsymptom)
								);
							}
						}

						for (const healthsymptom of healthsymptoms) {
							const localHealthsymptom = this.rows.find(
								(localHealthsymptom) => localHealthsymptom._id === healthsymptom._id
							);

							if (localHealthsymptom) {
								this._core.copy(healthsymptom, localHealthsymptom);

								await firstValueFrom(
									this._healthsymptomService.update(localHealthsymptom)
								);
							} else {
								this._preCreate(healthsymptom);

								await firstValueFrom(
									this._healthsymptomService.create(healthsymptom)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthsymptom: Healthsymptom): void {
		delete healthsymptom.__created;
	}
}
