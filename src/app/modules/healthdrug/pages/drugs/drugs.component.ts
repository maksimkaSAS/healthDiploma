import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthdrugService } from '../../services/healthdrug.service';
import { Healthdrug } from '../../interfaces/healthdrug.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthdrugFormComponents } from '../../formcomponents/healthdrug.formcomponents';

@Component({
	templateUrl: './drugs.component.html',
	styleUrls: ['./drugs.component.scss'],
	standalone: false,
})
export class DrugsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('healthdrug', healthdrugFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Healthdrug>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Healthdrug);

					this._healthdrugService.create(created as Healthdrug);

					close();
				},
			});
		},
		update: (doc: Healthdrug): void => {
			this._form
				.modal<Healthdrug>(this.form, [], doc)
				.then((updated: Healthdrug) => {
					this._core.copy(updated, doc);

					this._healthdrugService.update(doc);
				});
		},
		delete: (doc: Healthdrug): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthdrug?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._healthdrugService.delete(doc);
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Healthdrug): void => {
					this._form.modalUnique<Healthdrug>('healthdrug', 'url', doc);
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

	get rows(): Healthdrug[] {
		return this._healthdrugService.healthdrugs;
	}

	constructor(
		private _translate: TranslateService,
		private _healthdrugService: HealthdrugService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Healthdrug>(create ? [] : this.rows)
				.then((healthdrugs: Healthdrug[]) => {
					if (create) {
						for (const healthdrug of healthdrugs) {
							this._preCreate(healthdrug);

							this._healthdrugService.create(healthdrug);
						}
					} else {
						for (const healthdrug of this.rows) {
							if (
								!healthdrugs.find(
									(localHealthdrug) => localHealthdrug._id === healthdrug._id
								)
							) {
								this._healthdrugService.delete(healthdrug);
							}
						}

						for (const healthdrug of healthdrugs) {
							const localHealthdrug = this.rows.find(
								(localHealthdrug) => localHealthdrug._id === healthdrug._id
							);

							if (localHealthdrug) {
								this._core.copy(healthdrug, localHealthdrug);

								this._healthdrugService.update(localHealthdrug);
							} else {
								this._preCreate(healthdrug);

								this._healthdrugService.create(healthdrug);
							}
						}
					}
				});
		};
	}

	private _preCreate(healthdrug: Healthdrug): void {
		delete healthdrug.__created;
	}
}
