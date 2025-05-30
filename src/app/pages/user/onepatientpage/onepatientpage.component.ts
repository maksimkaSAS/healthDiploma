import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { healthpatientFormComponents } from 'src/app/modules/healthpatient/formcomponents/healthpatient.formcomponents';
import { Healthpatient } from 'src/app/modules/healthpatient/interfaces/healthpatient.interface';
import { HealthpatientService } from 'src/app/modules/healthpatient/services/healthpatient.service';
import { User } from 'src/app/modules/user/interfaces/user.interface';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AlertService, CoreService } from 'wacom';
import { environment } from 'src/environments/environment.prod';

@Component({
	templateUrl: './onepatientpage.component.html',
	styleUrls: ['./onepatientpage.component.scss'],
	standalone: false
})
export class OnepatientpageComponent {
	user: User;
	type = '';

	apiUrl = environment.url;

	onepatient = this._healthpatientService.doc(
		this._router.url.replace('/onepatientpage/', '')
	);

	constructor(
		private _healthpatientService: HealthpatientService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService,
		private _userService: UserService
	) {
		this.user = this._userService.doc(this.onepatient.author);
		console.log(this.user);
	}

	isMenuOpen = false;

	form: FormInterface = this._form.getForm(
		'patient',
		healthpatientFormComponents
	);

	update(doc: Healthpatient): void {
		this._form
			.modal<Healthpatient>(this.form, [], doc)
			.then((updated: Healthpatient) => {
				this._core.copy(updated, doc);

				this._healthpatientService.update(doc);
			});
	}

	delete(doc: Healthpatient): void {
		this._alert.question({
			text: this._translate.translate(
				'Common.Are you sure you want to delete this healthpatient?'
			),
			buttons: [
				{
					text: this._translate.translate('Common.No')
				},
				{
					text: this._translate.translate('Common.Yes'),
					callback: (): void => {
						this._healthpatientService.delete(doc);
						this._router.navigateByUrl('/mypatients');
					}
				}
			]
		});
	}

	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}

	onImageError(event: Event) {
		const target = event.target as HTMLImageElement;
		target.src = 'assets/defaultProfile.png';
	}
}
