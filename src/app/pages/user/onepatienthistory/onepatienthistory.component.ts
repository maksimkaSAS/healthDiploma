import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HealthrecordService } from 'src/app/modules/healthrecord/services/healthrecord.service';

@Component({
	templateUrl: './onepatienthistory.component.html',
	styleUrls: ['./onepatienthistory.component.scss'],
	standalone: false
})
export class OnepatienthistoryComponent {
	onepatienthistory = this._healthrecordService.doc(
			this._router.url.replace('/onepatienthistory/', '')
		);
	
		constructor(
			private _healthrecordService: HealthrecordService,
			private _router: Router
		) {}
		isMenuOpen = false;
}
