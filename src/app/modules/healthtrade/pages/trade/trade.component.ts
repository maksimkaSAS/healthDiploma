import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthtradeService } from '../../services/healthtrade.service';
import { Healthtrade } from '../../interfaces/healthtrade.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthtradeFormComponents } from '../../formcomponents/healthtrade.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	templateUrl: './trade.component.html',
	styleUrls: ['./trade.component.scss'],
	standalone: false,
})
export class TradeComponent {
	place_id = this._router.url.includes('trade/') ? this._router.url.replace('/trade/', '') : '';
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('healthtrade', healthtradeFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthtradeService.setPerPage.bind(this._healthtradeService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Healthtrade>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Healthtrade);

					await firstValueFrom(
						this._healthtradeService.create(created as Healthtrade)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Healthtrade): void => {
			this._form
				.modal<Healthtrade>(this.form, [], doc)
				.then((updated: Healthtrade) => {
					this._core.copy(updated, doc);

					this._healthtradeService.update(doc);
				});
		},
		delete: (doc: Healthtrade): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthtrade?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._healthtradeService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Healthtrade): void => {
					this._form.modalUnique<Healthtrade>('healthtrade', 'url', doc);
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

	rows: Healthtrade[] = [];

	constructor(
		private _translate: TranslateService,
		private _healthtradeService: HealthtradeService,
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
				this._healthtradeService.get({ page, query: this.place_id ? 
					'place=' + this.place_id : '' }).subscribe((rows) => {
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
				.modalDocs<Healthtrade>(create ? [] : this.rows)
				.then(async (healthtrades: Healthtrade[]) => {
					if (create) {
						for (const healthtrade of healthtrades) {
							this._preCreate(healthtrade);

							await firstValueFrom(
								this._healthtradeService.create(healthtrade)
							);
						}
					} else {
						for (const healthtrade of this.rows) {
							if (
								!healthtrades.find(
									(localHealthtrade) => localHealthtrade._id === healthtrade._id
								)
							) {
								await firstValueFrom(
									this._healthtradeService.delete(healthtrade)
								);
							}
						}

						for (const healthtrade of healthtrades) {
							const localHealthtrade = this.rows.find(
								(localHealthtrade) => localHealthtrade._id === healthtrade._id
							);

							if (localHealthtrade) {
								this._core.copy(healthtrade, localHealthtrade);

								await firstValueFrom(
									this._healthtradeService.update(localHealthtrade)
								);
							} else {
								this._preCreate(healthtrade);

								await firstValueFrom(
									this._healthtradeService.create(healthtrade)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthtrade: Healthtrade): void {
		delete healthtrade.__created;

		if(this.place_id) {
			healthtrade.place = this.place_id;
		   
		};
	}
}
