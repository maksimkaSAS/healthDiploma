import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthsymptomService } from '../../services/healthsymptom.service';
import { Healthsymptom } from '../../interfaces/healthsymptom.interface';

@Component({
	selector: 'healthsymptom-selector',
	templateUrl: './healthsymptom-selector.component.html',
	styleUrls: ['./healthsymptom-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthsymptom[] {
		return this._healthsymptomService.healthsymptoms;
	}

	constructor(private _healthsymptomService: HealthsymptomService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
