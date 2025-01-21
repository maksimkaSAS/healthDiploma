import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthanalysisService } from '../../services/healthanalysis.service';
import { Healthanalysis } from '../../interfaces/healthanalysis.interface';

@Component({
	selector: 'healthanalysis-selector',
	templateUrl: './healthanalysis-selector.component.html',
	styleUrls: ['./healthanalysis-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthanalysis[] {
		return this._healthanalysisService.healthanalysiss;
	}

	constructor(private _healthanalysisService: HealthanalysisService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
