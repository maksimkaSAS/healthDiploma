import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Value } from 'src/app/core/modules/input/input.component';
import { healthclinicFormComponents } from 'src/app/modules/healthclinic/formcomponents/healthclinic.formcomponents';
import { Healthclinic } from 'src/app/modules/healthclinic/interfaces/healthclinic.interface';
import { HealthclinicService } from 'src/app/modules/healthclinic/services/healthclinic.service';
import { AlertService, CoreService } from 'wacom';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './clinicspage.component.html',
	styleUrls: ['./clinicspage.component.scss'],
	standalone: false
})
export class ClinicspageComponent {
	// place_id = '';
	search = '';
	clinics: Healthclinic[] = [];

	constructor(
		private _healthclinicService: HealthclinicService,

		private _form: FormService,
		private translateService: TranslateService,
		public us: UserService
	) {
		this.load();
	}

	isMenuOpen = false;

	load(): void {
		this._healthclinicService
			.get(
				{
					// query: this.place_id ? 'place=' + this.place_id : ''
					query: this._query()
				},
				{ name: 'public' }
			)
			.subscribe((clinics) => {
				this.clinics.splice(0, this.clinics.length);
				this.clinics.push(...clinics);
			});
	}

	setField(value: Value): void {
		this.search = (value as string) || '';
	}

	private _query(): string {
		let query = '';

		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}
		return query;
	}

	/*ngOnInit(): void {
		this._healthclinicService
			.get({}, { name: 'public' })
			.subscribe((clinics) => {
				this.clinics = clinics;
			});
	}*/

	form: FormInterface = this._form.getForm(
		'clinic',
		healthclinicFormComponents
	);
	create(): void {
		this._form.modal<Healthclinic>(this.form, {
			label: 'Create',
			click: async (
				created: unknown,
				close: () => void
			): Promise<void> => {
				close();

				this._healthclinicService
					.create(created as Healthclinic)
					.subscribe(() => {
						this.load();
					});

				close();
			}
		});
	}

	getTranslatedText(toTranslate: string) {
		return this.translateService.translate(toTranslate);
	}
}
