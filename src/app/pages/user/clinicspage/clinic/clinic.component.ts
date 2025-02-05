import { Component, EventEmitter, Input, Output } from '@angular/core';
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
	@Output() load = new EventEmitter();

	constructor(
		private _translate: TranslateService,
		private _healthclinicService: HealthclinicService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	form: FormInterface = this._form.getForm(
		'patient',
		healthclinicFormComponents
	);

	update(doc: Healthclinic): void {
		this._form
			.modal<Healthclinic>(this.form, [], doc)
			.then((updated: Healthclinic) => {
				this._core.copy(updated, doc);

				this._healthclinicService.update(doc);
				// TODO temporary >
				const healthclinic = this._healthclinicService.doc(doc._id);
				this._core.copy(updated, healthclinic);
				//<
			});
	}

	delete(doc: Healthclinic): void {
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
						this._healthclinicService.delete(doc).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}
}
