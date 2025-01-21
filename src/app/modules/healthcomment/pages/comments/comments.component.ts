import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { HealthcommentService } from '../../services/healthcomment.service';
import { Healthcomment } from '../../interfaces/healthcomment.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { healthcommentFormComponents } from '../../formcomponents/healthcomment.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
	standalone: false,
})
export class CommentsComponent {
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

	constructor(
		private _translate: TranslateService,
		private _healthcommentService: HealthcommentService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._healthcommentService.get({ page }).subscribe((rows) => {
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
	}
}
