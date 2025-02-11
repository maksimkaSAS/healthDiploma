import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthpharmacyFormComponents } from 'src/app/modules/healthpharmacy/formcomponents/healthpharmacy.formcomponents';
import { Healthpharmacy } from 'src/app/modules/healthpharmacy/interfaces/healthpharmacy.interface';
import { HealthpharmacyService } from 'src/app/modules/healthpharmacy/services/healthpharmacy.service';

@Component({
	templateUrl: './pharmacy.component.html',
	styleUrls: ['./pharmacy.component.scss'],
	standalone: false
})
export class PharmacyComponent {
	//TODO drug_id = '';
	drug_id = '';
	search = '';
	pharmacy_drug = '';
	
	// link_id = '';
	pharmacies: Healthpharmacy[] = [];

	constructor(
		private _healthpharmacyService: HealthpharmacyService,
		private _form: FormService
	) {
		this.load();
	}

	load(): void {
		this._healthpharmacyService
			.get(
				{
					query: this._query()
				},
				{ name: 'public' }
			)
			.subscribe((pharmacies) => {
				this.pharmacies.splice(0, this.pharmacies.length);
				this.pharmacies.push(...pharmacies);
			});
	}

	private _query(): string {
		let query = '';

		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		if (this.drug_id) {
			query += (query ? '&' : '') + 'drug=' + this.drug_id;
		}

		// if (this.pharmacy_drug) {
		// 	query += (query ? '&' : '') + 'pharmacy_drug=' + this.pharmacy_drug;
		// }

		

		// if (this.link_id) {
		// 	query += (query ? '&' : '') + 'link=' + this.link_id;
		// }
		return query;
	}

	form: FormInterface = this._form.getForm(
		'clinic',
		healthpharmacyFormComponents
	);

	create(): void {
		this._form.modal<Healthpharmacy>(this.form, {
			label: 'Create',
			click: async (
				created: unknown,
				close: () => void
			): Promise<void> => {
				close();

				this._healthpharmacyService
					.create(created as Healthpharmacy)
					.subscribe(() => {
						this.load();
					});

				close();
			}
		});
	}

	/*ngOnInit(): void {
		this._healthpharmacyService
			.get({}, { name: 'public' })
			.subscribe((pharmacies) => {
				this.pharmacies = pharmacies;
			});
	}*/

	isMenuOpen = false;
}


/*const addIds = async (rec, res, next) => 
{
	if(rec.query.pharmacy.drug) {
		rec.locals.pharmacy_ids = ( await waw.Healthlink.find({
		drug: req.query.pharmacy_drug,
		}).select("pharmacy")
		).map((p) => p.pharmacy);

		query._id = pharmacy_ids

	}
}
*/