import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthcommentService } from '../../services/healthcomment.service';
import { Healthcomment } from '../../interfaces/healthcomment.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthcommentFormComponents } from '../../formcomponents/healthcomment.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
	standalone: false,
})
export class CommentsComponent {

	clinic_id = this._router.url.includes('comments/') ? this._router.url.replace('/comments/', '') : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('healthcomment', healthcommentFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._healthcommentService.setPerPage.bind(this._healthcommentService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Healthcomment>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Healthcomment);

					await firstValueFrom(
						this._healthcommentService.create(created as Healthcomment)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Healthcomment): void => {
			this._form
				.modal<Healthcomment>(this.form, [], doc)
				.then((updated: Healthcomment) => {
					this._core.copy(updated, doc);

					this._healthcommentService.update(doc);
				});
		},
		delete: (doc: Healthcomment): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this healthcomment?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._healthcommentService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Healthcomment): void => {
					this._form.modalUnique<Healthcomment>('healthcomment', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	rows: Healthcomment[] = [];

	//clinic_id = '';
	doctor_id = '';
	pharmacy_id = '';
	place_id = '';

	constructor(
		private _translate: TranslateService,
		private _healthcommentService: HealthcommentService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.setRows();
		this._route.paramMap.subscribe(params => {
			this.doctor_id = params.get('doctor_id') || '';
			this.pharmacy_id = params.get('pharmacy_id') || '';
			this.place_id = params.get('place_id') || '';
			
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._healthcommentService.get({ page, query:  this._query()/*query: this.clinic_id ? 
					'clinic=' + this.clinic_id : ''
				 */}).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Healthcomment>(create ? [] : this.rows)
				.then(async (healthcomments: Healthcomment[]) => {
					if (create) {
						for (const healthcomment of healthcomments) {
							this._preCreate(healthcomment);

							await firstValueFrom(
								this._healthcommentService.create(healthcomment)
							);
						}
					} else {
						for (const healthcomment of this.rows) {
							if (
								!healthcomments.find(
									(localHealthcomment) => localHealthcomment._id === healthcomment._id
								)
							) {
								await firstValueFrom(
									this._healthcommentService.delete(healthcomment)
								);
							}
						}

						for (const healthcomment of healthcomments) {
							const localHealthcomment = this.rows.find(
								(localHealthcomment) => localHealthcomment._id === healthcomment._id
							);

							if (localHealthcomment) {
								this._core.copy(healthcomment, localHealthcomment);

								await firstValueFrom(
									this._healthcommentService.update(localHealthcomment)
								);
							} else {
								this._preCreate(healthcomment);

								await firstValueFrom(
									this._healthcommentService.create(healthcomment)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(healthcomment: Healthcomment): void {
		delete healthcomment.__created;
		if(this.clinic_id) {
			healthcomment.clinic = this.clinic_id;
		   
		}

		if(this.doctor_id) {
			healthcomment.doctor = this.doctor_id;
		   
		};

		if(this.pharmacy_id) {
			healthcomment.pharmacy = this.pharmacy_id;
		   
		};

		if(this.place_id) {
			healthcomment.place = this.place_id;
		   
		};
	}

	private _query(): string {
		let query = '';
		if (this.clinic_id) {
			query += (query ? '&' : '') + 'clinic=' + this.clinic_id;
		}

		if (this.doctor_id) {
			query += (query ? '&' : '') + 'doctor=' + this.doctor_id;
		}

		if (this.pharmacy_id) {
			query += (query ? '&' : '') + 'pharmacy=' + this.pharmacy_id;
		}

		if (this.place_id) {
			query += (query ? '&' : '') + 'place=' + this.place_id;
		}

		return query;
	}
}
