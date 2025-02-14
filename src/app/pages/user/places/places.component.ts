import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Value } from 'src/app/core/modules/input/input.component';
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
	place_drug = '';
	search = '';
	pharmacy_id = '';

	places: Healthplace[] = [];

	constructor(
		private _healthplaceService: HealthplaceService,
		private _form: FormService
	) {
		this.load();
	}

	isMenuOpen = false;
	clinicDisabled = false;
	drugDisabled = false;
	pharmacyDisabled = false;

	load(): void {
		this._healthplaceService
			.get(
				{
					query: this._query()
				},
				{ name: 'public' }
			)
			.subscribe((places) => {
				this.places.splice(0, this.places.length);
				this.places.push(...places);
			});

		// this.clinicDisabled   = this.place_drug ? true : false;
		// this.drugDisabled = this.clinic_id ? true : false;

		if (!this.clinic_id && !this.pharmacy_id && !this.place_drug) {
			this.clinicDisabled = false;
			this.pharmacyDisabled = false;
			this.drugDisabled = false;
		}

		if (this.clinic_id) {
			this.clinicDisabled = false;
			this.pharmacyDisabled = true;
			this.drugDisabled = true;
		}

		if (this.pharmacy_id) {
			this.clinicDisabled = true;
			this.pharmacyDisabled = false;
			this.drugDisabled = true;
		}

		if (this.place_drug) {
			this.clinicDisabled = true;
			this.pharmacyDisabled = true;
			this.drugDisabled = false;
		}
	}

	setField(value: Value): void {
		this.search = (value as string) || '';
	}

	private _query(): string {
		let query = '';

		if (this.place_drug) {
			query += (query ? '&' : '') + 'place_drug=' + this.place_drug;
		}

		if (this.clinic_id) {
			query += (query ? '&' : '') + 'clinic=' + this.clinic_id;
		}

		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		if (this.pharmacy_id) {
			query += (query ? '&' : '') + 'pharmacy=' + this.pharmacy_id;
		}

		return query;
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
