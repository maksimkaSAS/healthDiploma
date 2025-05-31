import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { healthrecordFormComponents } from 'src/app/modules/healthrecord/formcomponents/healthrecord.formcomponents';
import { Healthrecord } from 'src/app/modules/healthrecord/interfaces/healthrecord.interface';
import { HealthrecordService } from 'src/app/modules/healthrecord/services/healthrecord.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './onepatienthistory.component.html',
	styleUrls: ['./onepatienthistory.component.scss'],
	standalone: false
})
export class OnepatienthistoryComponent {
	onepatienthistory = this._healthrecordService.doc(
		this._router.url.replace('/onepatienthistory/', '')
	);

	constructor(
		private _healthrecordService: HealthrecordService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	isMenuOpen = false;

	form: FormInterface = this._form.getForm(
		'record',
		healthrecordFormComponents
	);

	update(doc: Healthrecord): void {
		this._form
			.modal<Healthrecord>(this.form, [], doc)
			.then((updated: Healthrecord) => {
				this._core.copy(updated, doc);

				this._healthrecordService.update(doc);
			});
	}

	delete(doc: Healthrecord): void {
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
						this._healthrecordService.delete(doc);
						this._router.navigateByUrl(
							'/patienthistory/' + doc.patient
						);
					}
				}
			]
		});
	}

	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
}
