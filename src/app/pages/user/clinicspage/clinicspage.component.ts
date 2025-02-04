import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthclinicFormComponents } from 'src/app/modules/healthclinic/formcomponents/healthclinic.formcomponents';
import { Healthclinic } from 'src/app/modules/healthclinic/interfaces/healthclinic.interface';
import { HealthclinicService } from 'src/app/modules/healthclinic/services/healthclinic.service';
import { AlertService, CoreService } from 'wacom';

@Component({
	templateUrl: './clinicspage.component.html',
	styleUrls: ['./clinicspage.component.scss'],
	standalone: false
})
export class ClinicspageComponent {
	clinics: Healthclinic[] = [];

	constructor(
		private _healthclinicService: HealthclinicService,
		
		private _form: FormService,
		
	) {}

	isMenuOpen = false;

	ngOnInit(): void {
		this._healthclinicService
			.get({}, { name: 'public' })
			.subscribe((clinics) => {
				this.clinics = clinics;
			});
	}
	form: FormInterface = this._form.getForm(
		'clinic',
		healthclinicFormComponents
	);
	create(): void {
		this._form.modal<Healthclinic>(this.form, {
			label: 'Create',
			click:  (created: unknown, close: () => void) => {
				close();

				this._healthclinicService.create(created as Healthclinic);

				close();
			}
		});
	}
}
