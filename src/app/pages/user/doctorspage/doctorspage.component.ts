import { Component } from '@angular/core';
import { Healthdoctor } from 'src/app/modules/healthdoctor/interfaces/healthdoctor.interface';
import { HealthdoctorService } from 'src/app/modules/healthdoctor/services/healthdoctor.service';

@Component({
	templateUrl: './doctorspage.component.html',
	styleUrls: ['./doctorspage.component.scss'],
	standalone: false
})
export class DoctorspageComponent {
	doctors: Healthdoctor[] = [];

	constructor(private _healthdoctorService: HealthdoctorService) {}

	ngOnInit(): void {
		this._healthdoctorService
			.get({}, { name: 'public' })
			.subscribe((doctors) => {
				this.doctors = doctors;
			});
	}

	isMenuOpen=false;
}
