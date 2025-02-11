import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthlinkService } from '../../services/healthlink.service';
import { Healthlink } from '../../interfaces/healthlink.interface';

@Component({
	selector: 'healthlink-selector',
	templateUrl: './healthlink-selector.component.html',
	styleUrls: ['./healthlink-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectHealthlinkComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthlink[] {
		return this._healthlinkService.healthlinks;
	}

	constructor(private _healthlinkService: HealthlinkService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
