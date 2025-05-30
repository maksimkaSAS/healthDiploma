import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { healthdoctorFormComponents } from 'src/app/modules/healthdoctor/formcomponents/healthdoctor.formcomponents';
import { Healthdoctor } from 'src/app/modules/healthdoctor/interfaces/healthdoctor.interface';
import { HealthdoctorService } from 'src/app/modules/healthdoctor/services/healthdoctor.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './doctorpage.component.html',
	styleUrls: ['./doctorpage.component.scss'],
	standalone: false
})
export class DoctorpageComponent {
	onedoctor = this._healthdoctorService.doc(
		this._router.url.replace('/doctorpage/', '')
	);

	constructor(
		private _healthdoctorService: HealthdoctorService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService,
		public us: UserService
	) {}

	isMenuOpen = false;

	form: FormInterface = this._form.getForm(
		'record',
		healthdoctorFormComponents
	);

	update(doc: Healthdoctor): void {
		this._form
			.modal<Healthdoctor>(this.form, [], doc)
			.then((updated: Healthdoctor) => {
				this._core.copy(updated, doc);

				this._healthdoctorService.update(doc);
			});
	}

	delete(doc: Healthdoctor): void {
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
						this._healthdoctorService.delete(doc);
						this._router.navigateByUrl('/doctorspage');
					}
				}
			]
		});
	}

	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
}
