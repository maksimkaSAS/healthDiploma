import { Component, Input } from '@angular/core';
import { Healthpatient } from 'src/app/modules/healthpatient/interfaces/healthpatient.interface';

@Component({
	selector: 'app-mypatient',
	standalone: false,

	templateUrl: './mypatient.component.html',
	styleUrl: './mypatient.component.scss'
})
export class MypatientComponent {
	@Input() patient: Healthpatient;
}
