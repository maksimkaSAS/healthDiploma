import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { healthpharmacyFormComponents } from 'src/app/modules/healthpharmacy/formcomponents/healthpharmacy.formcomponents';
import { Healthpharmacy } from 'src/app/modules/healthpharmacy/interfaces/healthpharmacy.interface';
import { HealthpharmacyService } from 'src/app/modules/healthpharmacy/services/healthpharmacy.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './onepharmacypage.component.html',
	styleUrls: ['./onepharmacypage.component.scss'],
	standalone: false
})
export class OnepharmacypageComponent {
	onepharmacy = this._healthpharmacyService.doc(
		this._router.url.replace('/onepharmacypage/', '')
	);

	constructor(
		private _healthpharmacyService: HealthpharmacyService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	form: FormInterface = this._form.getForm(
			'record',
			healthpharmacyFormComponents
		);

		update(doc: Healthpharmacy): void {
				this._form
					.modal<Healthpharmacy>(this.form, [], doc)
					.then((updated: Healthpharmacy) => {
						this._core.copy(updated, doc);
		
						this._healthpharmacyService.update(doc);
					});
			}

			delete(doc: Healthpharmacy): void {
					this._alert.question({
						text: this._translate.translate(
							'Common.Are you sure you want to delete this healthrecord?'
						),
						buttons: [
							{
								text: this._translate.translate('Common.No')
							},
							{
								text: this._translate.translate('Common.Yes'),
								callback: (): void => {
									this._healthpharmacyService.delete(doc);
									this._router.navigateByUrl(
										'/pharmacy'
									);
								}
							}
						]
					});
				}

	isMenuOpen = false;
}
