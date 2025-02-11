import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthplaceFormComponents } from 'src/app/modules/healthplace/formcomponents/healthplace.formcomponents';
import { Healthplace } from 'src/app/modules/healthplace/interfaces/healthplace.interface';
import { HealthplaceService } from 'src/app/modules/healthplace/services/healthplace.service';

@Component({
	templateUrl: './places.component.html',
	styleUrls: ['./places.component.scss'],
	standalone: false
})
export class PlacesComponent {
	clinic_id = '';
	places: Healthplace[] = [];

	constructor(
		private _healthplaceService: HealthplaceService,
		private _form: FormService
	) {
		this.load();
	}

	isMenuOpen = false;

	load(): void {
		this._healthplaceService
			.get(
				{
					query: this.clinic_id ? 'clinic=' + this.clinic_id : ''
				},
				{ name: 'public' }
			)
			.subscribe((places) => {
				this.places.splice(0, this.places.length);
				this.places.push(...places);
			});
	}

	form: FormInterface = this._form.getForm(
		'clinic',
		healthplaceFormComponents
	);

	create(): void {
		this._form.modal<Healthplace>(this.form, {
			label: 'Create',
			click: async (
				created: unknown,
				close: () => void
			): Promise<void> => {
				close();

				this._healthplaceService
					.create(created as Healthplace)
					.subscribe(() => {
						this.load();
					});

				close();
			}
		});
	}

	// ngOnInit(): void {
	// 	this._healthplaceService
	// 		.get({}, { name: 'public' })
	// 		.subscribe((places) => {
	// 			this.places = places;
	// 		});
	// }
}
