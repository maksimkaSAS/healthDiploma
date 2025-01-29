import { Component } from '@angular/core';
import { Healthcomment } from 'src/app/modules/healthcomment/interfaces/healthcomment.interface';
import { HealthcommentService } from 'src/app/modules/healthcomment/services/healthcomment.service';

@Component({
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
	standalone: false
})
export class CommentsComponent {
	comments: Healthcomment[] = [];

	constructor(private _healthcommentService: HealthcommentService) {}

	ngOnInit(): void {
		this._healthcommentService
			.get({}, { name: 'public' })
			.subscribe((comments) => {
				this.comments = comments;
			});
	}
}
