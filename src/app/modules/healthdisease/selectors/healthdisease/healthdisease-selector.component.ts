import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthdiseaseService } from '../../services/healthdisease.service';
import { Healthdisease } from '../../interfaces/healthdisease.interface';

@Component({
	selector: 'healthdisease-selector',
	templateUrl: './healthdisease-selector.component.html',
	styleUrls: ['./healthdisease-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthdisease[] {
		return this._healthdiseaseService.healthdiseases;
	}

	constructor(private _healthdiseaseService: HealthdiseaseService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
