import { Component } from '@angular/core';
import { Healthplace } from 'src/app/modules/healthplace/interfaces/healthplace.interface';
import { HealthplaceService } from 'src/app/modules/healthplace/services/healthplace.service';

@Component({
	templateUrl: './places.component.html',
	styleUrls: ['./places.component.scss'],
	standalone: false
})
export class PlacesComponent {
	places: Healthplace[] = [];

	constructor(private _healthplaceService: HealthplaceService) {}

	ngOnInit(): void {
		this._healthplaceService
			.get({}, { name: 'public' })
			.subscribe((places) => {
				this.places = places;
			});
	}
}
