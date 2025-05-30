import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthpharmacyService } from '../../services/healthpharmacy.service';
import { Healthpharmacy } from '../../interfaces/healthpharmacy.interface';

@Component({
	selector: 'healthpharmacy-selector',
	templateUrl: './healthpharmacy-selector.component.html',
	styleUrls: ['./healthpharmacy-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectHealthPharmacyComponent implements OnChanges {
	@Input() value: string;
	@Input() disabled: boolean;
	@Output() wChange = new EventEmitter();
	@Input() placeholder: string = '';

	get items(): Healthpharmacy[] {
		return this._healthpharmacyService.healthpharmacy;
	}

	constructor(private _healthpharmacyService: HealthpharmacyService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
		if (changes['disabled'] && !changes['disabled'].firstChange) {
			this.disabled = changes['disabled'].currentValue;
		}
	}
}
