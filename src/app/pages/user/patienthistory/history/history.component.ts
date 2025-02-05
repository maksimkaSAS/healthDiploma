import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { healthrecordFormComponents } from 'src/app/modules/healthrecord/formcomponents/healthrecord.formcomponents';
import { Healthrecord } from 'src/app/modules/healthrecord/interfaces/healthrecord.interface';
import { HealthrecordService } from 'src/app/modules/healthrecord/services/healthrecord.service';

import { AlertService, CoreService } from 'wacom';

@Component({
	selector: 'app-history',
	standalone: false,

	templateUrl: './history.component.html',
	styleUrl: './history.component.scss'
})
export class HistoryComponent {
	@Input() record: Healthrecord;
	@Output() load = new EventEmitter;
	constructor(
		private _translate: TranslateService,
		private _healthrecordService: HealthrecordService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

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
        // TODO temporary >
        const healthrecord = this._healthrecordService.doc (doc._id);
        this._core.copy(updated, healthrecord);
        //<
			});
	}
  

	delete(doc: Healthrecord): void {
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
					callback: async (): Promise<void> => {
						this._healthrecordService.delete(doc).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}
}
