import { Component, Input } from '@angular/core';
import { Healthcomment } from 'src/app/modules/healthcomment/interfaces/healthcomment.interface';

@Component({
	selector: 'app-comment',
	standalone: false,

	templateUrl: './comment.component.html',
	styleUrl: './comment.component.scss'
})
export class CommentComponent {
	@Input() comment: Healthcomment;
}
