import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthtreatmentService } from '../../services/healthtreatment.service';
import { Healthtreatment } from '../../interfaces/healthtreatment.interface';

@Component({
	selector: 'healthtreatment-selector',
	templateUrl: './healthtreatment-selector.component.html',
	styleUrls: ['./healthtreatment-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthtreatment[] {
		return this._healthtreatmentService.healthtreatments;
	}

	constructor(private _healthtreatmentService: HealthtreatmentService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
