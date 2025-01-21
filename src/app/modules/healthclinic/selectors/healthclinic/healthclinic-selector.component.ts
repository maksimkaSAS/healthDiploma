import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthclinicService } from '../../services/healthclinic.service';
import { Healthclinic } from '../../interfaces/healthclinic.interface';

@Component({
	selector: 'healthclinic-selector',
	templateUrl: './healthclinic-selector.component.html',
	styleUrls: ['./healthclinic-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthclinic[] {
		return this._healthclinicService.healthclinics;
	}

	constructor(private _healthclinicService: HealthclinicService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
