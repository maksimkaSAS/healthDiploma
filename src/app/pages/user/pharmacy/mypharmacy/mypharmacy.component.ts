import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { healthpharmacyFormComponents } from 'src/app/modules/healthpharmacy/formcomponents/healthpharmacy.formcomponents';
import { Healthpharmacy } from 'src/app/modules/healthpharmacy/interfaces/healthpharmacy.interface';
import { HealthpharmacyService } from 'src/app/modules/healthpharmacy/services/healthpharmacy.service';
import { AlertService, CoreService } from 'wacom';

@Component({
	selector: 'app-mypharmacy',
	standalone: false,

	templateUrl: './mypharmacy.component.html',
	styleUrl: './mypharmacy.component.scss'
})
export class MypharmacyComponent {
	@Input() pharmacy: Healthpharmacy;
	@Output() load = new EventEmitter();


	constructor(
			private _translate: TranslateService,
			private _healthpharmacyService: HealthpharmacyService,
			private _alert: AlertService,
			private _form: FormService,
			private _core: CoreService,
			private _router: Router
		) {}

		form: FormInterface = this._form.getForm(
				'patient',
				healthpharmacyFormComponents
			);

			update(doc: Healthpharmacy): void {
					this._form
						.modal<Healthpharmacy>(this.form, [], doc)
						.then((updated: Healthpharmacy) => {
							this._core.copy(updated, doc);
			
							this._healthpharmacyService.update(doc);
							// TODO temporary >
							const healthpharmacy = this._healthpharmacyService.doc(doc._id);
							this._core.copy(updated, healthpharmacy);
							//<
						});
				}

				delete(doc: Healthpharmacy): void {
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
										this._healthpharmacyService.delete(doc).subscribe(() => {
											this.load.emit();
										});
									}
								}
							]
						});
					}
}
