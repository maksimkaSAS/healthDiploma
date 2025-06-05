import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';

import { healthplaceFormComponents } from 'src/app/modules/healthplace/formcomponents/healthplace.formcomponents';
import { Healthplace } from 'src/app/modules/healthplace/interfaces/healthplace.interface';
import { HealthplaceService } from 'src/app/modules/healthplace/services/healthplace.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AlertService, CoreService } from 'wacom';

@Component({
	selector: 'app-place',
	standalone: false,

	templateUrl: './place.component.html',
	styleUrl: './place.component.scss'
})
export class PlaceComponent {
	@Input() place: Healthplace;

	@Output() load = new EventEmitter();

	constructor(
		private _translate: TranslateService,
		private _healthplaceService: HealthplaceService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		public us: UserService
	) {}

	form: FormInterface = this._form.getForm(
		'patient',
		healthplaceFormComponents
	);

	update(doc: Healthplace): void {
		this._form
			.modal<Healthplace>(this.form, [], doc)
			.then((updated: Healthplace) => {
				this._core.copy(updated, doc);

				this._healthplaceService.update(doc);
				// TODO temporary >
				const healthplace = this._healthplaceService.doc(doc._id);
				this._core.copy(updated, healthplace);
				//<
			});
	}

	delete(doc: Healthplace): void {
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
						this._healthplaceService.delete(doc).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}
}
