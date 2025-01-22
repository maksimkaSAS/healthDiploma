import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthplaceService } from '../../services/healthplace.service';
import { Healthplace } from '../../interfaces/healthplace.interface';

@Component({
	selector: 'healthplace-selector',
	templateUrl: './healthplace-selector.component.html',
	styleUrls: ['./healthplace-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthplace[] {
		return this._healthplaceService.healthplaces;
	}

	constructor(private _healthplaceService: HealthplaceService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
