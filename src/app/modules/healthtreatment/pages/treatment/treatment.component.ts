import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthtreatmentService } from '../../services/healthtreatment.service';
import { Healthtreatment } from '../../interfaces/healthtreatment.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthtreatmentFormComponents } from '../../formcomponents/healthtreatment.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './treatment.component.html',
	styleUrls: ['./treatment.component.scss'],
	standalone: false,
})
export class TreatmentComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('healthtreatment', healthtreatmentFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthtreatmentService.setPerPage.bind(this._healthtreatmentService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Healthtreatment>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Healthtreatment);

					await firstValueFrom(
						this._healthtreatmentService.create(created as Healthtreatment)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Healthtreatment): void => {
			this._form
				.modal<Healthtreatment>(this.form, [], doc)
				.then((updated: Healthtreatment) => {
					this._core.copy(updated, doc);

					this._healthtreatmentService.update(doc);
				});
		},
		delete: (doc: Healthtreatment): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthtreatment?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._healthtreatmentService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Healthtreatment): void => {
					this._form.modalUnique<Healthtreatment>('healthtreatment', 'url', doc);
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

	rows: Healthtreatment[] = [];

	constructor(
		private _translate: TranslateService,
		private _healthtreatmentService: HealthtreatmentService,
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
				this._healthtreatmentService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Healthtreatment>(create ? [] : this.rows)
				.then(async (healthtreatments: Healthtreatment[]) => {
					if (create) {
						for (const healthtreatment of healthtreatments) {
							this._preCreate(healthtreatment);

							await firstValueFrom(
								this._healthtreatmentService.create(healthtreatment)
							);
						}
					} else {
						for (const healthtreatment of this.rows) {
							if (
								!healthtreatments.find(
									(localHealthtreatment) => localHealthtreatment._id === healthtreatment._id
								)
							) {
								await firstValueFrom(
									this._healthtreatmentService.delete(healthtreatment)
								);
							}
						}

						for (const healthtreatment of healthtreatments) {
							const localHealthtreatment = this.rows.find(
								(localHealthtreatment) => localHealthtreatment._id === healthtreatment._id
							);

							if (localHealthtreatment) {
								this._core.copy(healthtreatment, localHealthtreatment);

								await firstValueFrom(
									this._healthtreatmentService.update(localHealthtreatment)
								);
							} else {
								this._preCreate(healthtreatment);

								await firstValueFrom(
									this._healthtreatmentService.create(healthtreatment)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthtreatment: Healthtreatment): void {
		delete healthtreatment.__created;
	}
}
