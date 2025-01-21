import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthrecordService } from '../../services/healthrecord.service';
import { Healthrecord } from '../../interfaces/healthrecord.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthrecordFormComponents } from '../../formcomponents/healthrecord.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './records.component.html',
	styleUrls: ['./records.component.scss'],
	standalone: false,
})
export class RecordsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('healthrecord', healthrecordFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthrecordService.setPerPage.bind(this._healthrecordService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Healthrecord>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Healthrecord);

					await firstValueFrom(
						this._healthrecordService.create(created as Healthrecord)
					);

					this.setRows();
				},
			});
		},
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
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._healthrecordService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Healthrecord): void => {
					this._form.modalUnique<Healthrecord>('healthrecord', 'url', doc);
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

	rows: Healthrecord[] = [];

	constructor(
		private _translate: TranslateService,
		private _healthrecordService: HealthrecordService,
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
				this._healthrecordService.get({ page }).subscribe((rows) => {
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
									(localHealthrecord) => localHealthrecord._id === healthrecord._id
								)
							) {
								await firstValueFrom(
									this._healthrecordService.delete(healthrecord)
								);
							}
						}

						for (const healthrecord of healthrecords) {
							const localHealthrecord = this.rows.find(
								(localHealthrecord) => localHealthrecord._id === healthrecord._id
							);

							if (localHealthrecord) {
								this._core.copy(healthrecord, localHealthrecord);

								await firstValueFrom(
									this._healthrecordService.update(localHealthrecord)
								);
							} else {
								this._preCreate(healthrecord);

								await firstValueFrom(
									this._healthrecordService.create(healthrecord)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthrecord: Healthrecord): void {
		delete healthrecord.__created;
	}
}
