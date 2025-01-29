import { Component, Input } from '@angular/core';
import { Healthplace } from 'src/app/modules/healthplace/interfaces/healthplace.interface';

@Component({
	selector: 'app-place',
	standalone: false,

	templateUrl: './place.component.html',
	styleUrl: './place.component.scss'
})
export class PlaceComponent {
	@Input() place: Healthplace;
}
