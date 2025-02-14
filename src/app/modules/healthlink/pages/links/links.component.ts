import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthlinkService } from '../../services/healthlink.service';
import { Healthlink } from '../../interfaces/healthlink.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthlinkFormComponents } from '../../formcomponents/healthlink.formcomponents';
import { firstValueFrom } from 'rxjs';
import { HealthdrugService } from 'src/app/modules/healthdrug/services/healthdrug.service';
import { Healthdrug } from 'src/app/modules/healthdrug/interfaces/healthdrug.interface';
import { HealthplaceService } from 'src/app/modules/healthplace/services/healthplace.service';
import { Healthplace } from 'src/app/modules/healthplace/interfaces/healthplace.interface';
import { HealthpharmacyService } from 'src/app/modules/healthpharmacy/services/healthpharmacy.service';
import { Healthpharmacy } from 'src/app/modules/healthpharmacy/interfaces/healthpharmacy.interface';

@Component({
	templateUrl: './links.component.html',
	styleUrls: ['./links.component.scss'],
	standalone: false
})
export class LinksComponent {
	columns = ['place', 'drug', 'pharmacy'];

	form: FormInterface = this._form.getForm(
		'healthlink',
		healthlinkFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthlinkService.setPerPage.bind(
			this._healthlinkService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Healthlink>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Healthlink);

					await firstValueFrom(
						this._healthlinkService.create(created as Healthlink)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Healthlink): void => {
			this._form
				.modal<Healthlink>(this.form, [], doc)
				.then((updated: Healthlink) => {
					this._core.copy(updated, doc);

					this._healthlinkService.update(doc);
				});
		},
		delete: (doc: Healthlink): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthlink?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._healthlinkService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},

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

	rows: Healthlink[] = [];

	constructor(
		private _translate: TranslateService,
		private _healthlinkService: HealthlinkService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _healthdrugService: HealthdrugService,
		private _healthplaceService: HealthplaceService,
		private _healthpharmacyService: HealthpharmacyService
	) {

		
		this._healthdrugService.get().subscribe(drugs => {
			const currentDrugs = healthlinkFormComponents.components[0]
				.fields[2].value as Array<Healthdrug>;

				currentDrugs.splice(0, currentDrugs.length);

				currentDrugs.push(...drugs);
			console.log(drugs);
			
		})

		this._healthplaceService.get().subscribe(places => {
			const currentPlace = healthlinkFormComponents.components[1]
				.fields[2].value as Array<Healthplace>;

			currentPlace.splice(0, currentPlace.length);

			currentPlace.push(...places);
			console.log(places);
			
		})

		this._healthpharmacyService.get().subscribe(pharmacies => {
			const currentPharmacy = healthlinkFormComponents.components[2]
				.fields[2].value as Array<Healthpharmacy>;

				currentPharmacy.splice(0, currentPharmacy.length);

				currentPharmacy.push(...pharmacies);
			console.log(pharmacies);
			
		})



		console.log(_healthdrugService);
		console.log(_healthplaceService);
		console.log(_healthpharmacyService);

		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._healthlinkService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Healthlink>(create ? [] : this.rows)
				.then(async (healthlinks: Healthlink[]) => {
					if (create) {
						for (const healthlink of healthlinks) {
							this._preCreate(healthlink);

							await firstValueFrom(
								this._healthlinkService.create(healthlink)
							);
						}
					} else {
						for (const healthlink of this.rows) {
							if (
								!healthlinks.find(
									(localHealthlink) =>
										localHealthlink._id === healthlink._id
								)
							) {
								await firstValueFrom(
									this._healthlinkService.delete(healthlink)
								);
							}
						}

						for (const healthlink of healthlinks) {
							const localHealthlink = this.rows.find(
								(localHealthlink) =>
									localHealthlink._id === healthlink._id
							);

							if (localHealthlink) {
								this._core.copy(healthlink, localHealthlink);

								await firstValueFrom(
									this._healthlinkService.update(
										localHealthlink
									)
								);
							} else {
								this._preCreate(healthlink);

								await firstValueFrom(
									this._healthlinkService.create(healthlink)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthlink: Healthlink): void {
		delete healthlink.__created;
	}
}
