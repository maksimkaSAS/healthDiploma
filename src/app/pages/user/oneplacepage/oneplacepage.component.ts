import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { healthplaceFormComponents } from 'src/app/modules/healthplace/formcomponents/healthplace.formcomponents';
import { Healthplace } from 'src/app/modules/healthplace/interfaces/healthplace.interface';
import { HealthplaceService } from 'src/app/modules/healthplace/services/healthplace.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './oneplacepage.component.html',
	styleUrls: ['./oneplacepage.component.scss'],
	standalone: false
})
export class OneplacepageComponent {
	oneplace = this._healthplaceService.doc(
		this._router.url.replace('/oneplacepage/', '')
	);

	constructor(
		private _healthplaceService: HealthplaceService,
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
		healthplaceFormComponents
	);

	update(doc: Healthplace): void {
		this._form
			.modal<Healthplace>(this.form, [], doc)
			.then((updated: Healthplace) => {
				this._core.copy(updated, doc);

				this._healthplaceService.update(doc);
			});
	}

	delete(doc: Healthplace): void {
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
						this._healthplaceService.delete(doc);
						this._router.navigateByUrl('/allplaces');
					}
				}
			]
		});
	}

	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
}
