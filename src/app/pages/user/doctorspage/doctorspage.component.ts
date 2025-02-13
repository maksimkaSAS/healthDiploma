import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthdoctorFormComponents } from 'src/app/modules/healthdoctor/formcomponents/healthdoctor.formcomponents';
import { Healthdoctor } from 'src/app/modules/healthdoctor/interfaces/healthdoctor.interface';
import { HealthdoctorService } from 'src/app/modules/healthdoctor/services/healthdoctor.service';

@Component({
	templateUrl: './doctorspage.component.html',
	styleUrls: ['./doctorspage.component.scss'],
	standalone: false
})
export class DoctorspageComponent {
	//TODO clinic_id = '';
	clinic_id = '';
	search = '';
	doctors: Healthdoctor[] = [];

	constructor(
		private _healthdoctorService: HealthdoctorService,
		private _form: FormService
	) {
		this.load();
	}

	isMenuOpen = false;

	load(): void {
		this._healthdoctorService
			.get(
				{
					query: this._query()
				},
				{ name: 'public' }
			)
			.subscribe((doctors) => {
				this.doctors.splice(0, this.doctors.length);
				this.doctors.push(...doctors);
			});
	}

	private _query(): string {
		let query = '';

		if (this.clinic_id) {
			query += (query ? '&' : '') + 'clinic=' + this.clinic_id;
		}


		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		

		return query;
	}

	form: FormInterface = this._form.getForm(
		'clinic',
		healthdoctorFormComponents
	);

	create(): void {
		this._form.modal<Healthdoctor>(this.form, {
			label: 'Create',
			click: async (
				created: unknown,
				close: () => void
			): Promise<void> => {
				close();

				this._healthdoctorService
					.create(created as Healthdoctor)
					.subscribe(() => {
						this.load();
					});

				close();
			}
		});
	}

	/*ngOnInit(): void {
		this._healthdoctorService
			.get({}, { name: 'public' })
			.subscribe((doctors) => {
				this.doctors = doctors;
			});
	}*/
}
