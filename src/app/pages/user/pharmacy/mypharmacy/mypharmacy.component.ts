import { Component, Input } from '@angular/core';
import { Healthpharmacy } from 'src/app/modules/healthpharmacy/interfaces/healthpharmacy.interface';

@Component({
	selector: 'app-mypharmacy',
	standalone: false,

	templateUrl: './mypharmacy.component.html',
	styleUrl: './mypharmacy.component.scss'
})
export class MypharmacyComponent {
	@Input() pharmacy: Healthpharmacy;
}
