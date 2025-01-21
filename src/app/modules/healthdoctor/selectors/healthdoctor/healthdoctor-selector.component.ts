import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthdoctorService } from '../../services/healthdoctor.service';
import { Healthdoctor } from '../../interfaces/healthdoctor.interface';

@Component({
	selector: 'healthdoctor-selector',
	templateUrl: './healthdoctor-selector.component.html',
	styleUrls: ['./healthdoctor-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthdoctor[] {
		return this._healthdoctorService.healthdoctors;
	}

	constructor(private _healthdoctorService: HealthdoctorService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
