import { Component } from '@angular/core';
import { Healthrecord } from 'src/app/modules/healthrecord/interfaces/healthrecord.interface';
import { HealthrecordService } from 'src/app/modules/healthrecord/services/healthrecord.service';

@Component({
	templateUrl: './patienthistory.component.html',
	styleUrls: ['./patienthistory.component.scss'],
	standalone: false
})
export class PatienthistoryComponent {
	records: Healthrecord[] = [];
	
		constructor(private _healthrecordService: HealthrecordService) {}
	
		ngOnInit(): void {
			this._healthrecordService
				.get({}, { name: 'public' })
				.subscribe((records) => {
					this.records = records;
				});
		}
	
		isMenuOpen=false;
}
