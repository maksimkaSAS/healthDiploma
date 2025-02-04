import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthpatientFormComponents } from 'src/app/modules/healthpatient/formcomponents/healthpatient.formcomponents';
import { Healthpatient } from 'src/app/modules/healthpatient/interfaces/healthpatient.interface';
import { HealthpatientService } from 'src/app/modules/healthpatient/services/healthpatient.service';

@Component({
	templateUrl: './patient.component.html',
	styleUrls: ['./patient.component.scss'],
	standalone: false
})
export class PatientsComponent {
	get patients(): Healthpatient[] {
		return this._healthpatientService.healthpatients;
	}

	form: FormInterface = this._form.getForm('patient', healthpatientFormComponents);
	isMenuOpen=false;
	constructor(private _healthpatientService: HealthpatientService, private _form: FormService,) {}

	create(): void {
		this._form.modal<Healthpatient>(this.form, {
			label: 'Create',
			click: (created: unknown, close: () => void) => {
				

				this._healthpatientService.create(created as Healthpatient);

				close();
			}
		
		});
	
}
}


