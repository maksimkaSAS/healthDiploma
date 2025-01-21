import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { HealthcommentService } from '../../services/healthcomment.service';
import { Healthcomment } from '../../interfaces/healthcomment.interface';

@Component({
	selector: 'healthcomment-selector',
	templateUrl: './healthcomment-selector.component.html',
	styleUrls: ['./healthcomment-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Healthcomment[] {
		return this._healthcommentService.healthcomments;
	}

	constructor(private _healthcommentService: HealthcommentService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
