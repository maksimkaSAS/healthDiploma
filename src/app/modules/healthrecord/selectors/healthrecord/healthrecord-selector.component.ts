import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthrecordService } from '../../services/healthrecord.service';
import { Healthrecord } from '../../interfaces/healthrecord.interface';

@Component({
	selector: 'healthrecord-selector',
	templateUrl: './healthrecord-selector.component.html',
	styleUrls: ['./healthrecord-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthrecord[] {
		return this._healthrecordService.healthrecords;
	}

	constructor(private _healthrecordService: HealthrecordService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
