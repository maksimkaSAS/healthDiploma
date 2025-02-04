import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { healthclinicFormComponents } from 'src/app/modules/healthclinic/formcomponents/healthclinic.formcomponents';
import { Healthclinic } from 'src/app/modules/healthclinic/interfaces/healthclinic.interface';
import { HealthclinicService } from 'src/app/modules/healthclinic/services/healthclinic.service';
import { AlertService, CoreService } from 'wacom';

@Component({
	selector: 'app-clinic',
	standalone: false,

	templateUrl: './clinic.component.html',
	styleUrl: './clinic.component.scss'
})
export class ClinicComponent {
	@Input() clinic: Healthclinic;


	constructor(
				private _translate: TranslateService,
						private _healthclinicService: HealthclinicService,
						private _alert: AlertService,
						private _form: FormService,
						private _core: CoreService,
						private _router: Router,
	){}
	
			form: FormInterface = this._form.getForm('patient', healthclinicFormComponents);
	
			update (doc: Healthclinic): void  {
						this._form
							.modal<Healthclinic>(this.form, [], doc)
							.then((updated: Healthclinic) => {
								this._core.copy(updated, doc);
			
								this._healthclinicService.update(doc);
							});
					}

					delete (doc: Healthclinic): void  {
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
									callback: (): void => {
										this._healthclinicService.delete(doc);
									}
								}
							]
						});
}
}
