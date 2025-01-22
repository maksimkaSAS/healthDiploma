import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthtradeService } from '../../services/healthtrade.service';
import { Healthtrade } from '../../interfaces/healthtrade.interface';

@Component({
	selector: 'healthtrade-selector',
	templateUrl: './healthtrade-selector.component.html',
	styleUrls: ['./healthtrade-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthtrade[] {
		return this._healthtradeService.healthtrades;
	}

	constructor(private _healthtradeService: HealthtradeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
