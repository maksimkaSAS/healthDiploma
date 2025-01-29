import { Component, Input } from '@angular/core';
import { Healthclinic } from 'src/app/modules/healthclinic/interfaces/healthclinic.interface';

@Component({
	selector: 'app-clinic',
	standalone: false,

	templateUrl: './clinic.component.html',
	styleUrl: './clinic.component.scss'
})
export class ClinicComponent {
	@Input() clinic: Healthclinic;
}
