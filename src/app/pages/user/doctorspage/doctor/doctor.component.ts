import { Component, Input } from '@angular/core';
import { Healthdoctor } from 'src/app/modules/healthdoctor/interfaces/healthdoctor.interface';

@Component({
	selector: 'app-doctor',
	standalone: false,

	templateUrl: './doctor.component.html',
	styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
	@Input() doctor: Healthdoctor;
}
