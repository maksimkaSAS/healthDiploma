import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Value } from 'src/app/core/modules/input/input.component';
import { HealthdrugService } from 'src/app/modules/healthdrug/services/healthdrug.service';
import { HealthlinkService } from 'src/app/modules/healthlink/services/healthlink.service';
import { healthpharmacyFormComponents } from 'src/app/modules/healthpharmacy/formcomponents/healthpharmacy.formcomponents';
import { Healthpharmacy } from 'src/app/modules/healthpharmacy/interfaces/healthpharmacy.interface';
import { HealthpharmacyService } from 'src/app/modules/healthpharmacy/services/healthpharmacy.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';

@Component({
	templateUrl: './pharmacy.component.html',
	styleUrls: ['./pharmacy.component.scss'],
	standalone: false
})
export class PharmacyComponent {
	search = '';
	pharmacy_drug: string = ''; // Тепер містить лише name препарату
	pharmacies: Healthpharmacy[] = [];
	isMenuOpen = false;
	drug_id = '';

	constructor(
		public healthpharmacyService: HealthpharmacyService,
		public healthdrugService: HealthdrugService,
		public healthlinkService: HealthlinkService,
		private _form: FormService,
		private translateService: TranslateService
	) {
		this.load();
	}

	load(): void {
		this.healthpharmacyService
			.get({ query: this._query() }, { name: 'public' })
			.subscribe((pharmacies) => {
				this.pharmacies.splice(0, this.pharmacies.length);
				this.pharmacies.push(...pharmacies);
			});
	}

	setField(value: Value): void {
		this.search = (value as string) || '';
	}

	// Обробка зміни препарату
	onDrugChange(drug: string | { name: string; _id: string }): void {
		this.pharmacy_drug = typeof drug === 'object' ? drug.name : drug;
		this.load();
	}

	private _query(): string {
		let query = '';

		if (this.search) {
			query += (query ? '&' : '') + 'search=' + this.search;
		}

		if (this.pharmacy_drug) {
			query += (query ? '&' : '') + 'pharmacy_drug=' + this.pharmacy_drug;
		}

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
				this.healthpharmacyService
					.create(created as Healthpharmacy)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	getTranslatedText(toTranslate: string) {
		return this.translateService.translate(toTranslate);
	}
}
