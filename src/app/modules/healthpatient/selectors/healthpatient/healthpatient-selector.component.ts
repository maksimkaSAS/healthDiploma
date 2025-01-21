import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthpatientService } from '../../services/healthpatient.service';
import { Healthpatient } from '../../interfaces/healthpatient.interface';

@Component({
	selector: 'healthpatient-selector',
	templateUrl: './healthpatient-selector.component.html',
	styleUrls: ['./healthpatient-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthpatient[] {
		return this._healthpatientService.healthpatients;
	}

	constructor(private _healthpatientService: HealthpatientService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
