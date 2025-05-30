import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthdrugService } from '../../services/healthdrug.service';
import { Healthdrug } from '../../interfaces/healthdrug.interface';

@Component({
	selector: 'healthdrug-selector',
	templateUrl: './healthdrug-selector.component.html',
	styleUrls: ['./healthdrug-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectHealthDrugComponent implements OnChanges {
	@Input() value: string;
	@Input() disabled: boolean;
	@Output() wChange = new EventEmitter();
	@Input() placeholder: string = '';

	get items(): Healthdrug[] {
		return this._healthdrugService.healthdrugs;
	}

	constructor(private _healthdrugService: HealthdrugService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
		if (changes['disabled'] && !changes['disabled'].firstChange) {
			this.disabled = changes['disabled'].currentValue;
		}
	}
}
