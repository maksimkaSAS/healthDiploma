import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { healthdoctorFormComponents } from 'src/app/modules/healthdoctor/formcomponents/healthdoctor.formcomponents';
import { Healthdoctor } from 'src/app/modules/healthdoctor/interfaces/healthdoctor.interface';
import { HealthdoctorService } from 'src/app/modules/healthdoctor/services/healthdoctor.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AlertService, CoreService } from 'wacom';

@Component({
	selector: 'app-doctor',
	standalone: false,

	templateUrl: './doctor.component.html',
	styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
	@Input() doctor: Healthdoctor;
	@Output() load = new EventEmitter();

	constructor(
		private _translate: TranslateService,
		private _healthdoctorService: HealthdoctorService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		public us: UserService
	) {}

	form: FormInterface = this._form.getForm(
		'patient',
		healthdoctorFormComponents
	);

	update(doc: Healthdoctor): void {
		this._form
			.modal<Healthdoctor>(this.form, [], doc)
			.then((updated: Healthdoctor) => {
				this._core.copy(updated, doc);

				this._healthdoctorService.update(doc);
				// TODO temporary >
				const healthdoctor = this._healthdoctorService.doc(doc._id);
				this._core.copy(updated, healthdoctor);
				//<
			});
	}
	delete(doc: Healthdoctor): void {
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
						this._healthdoctorService.delete(doc).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}

	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
}
