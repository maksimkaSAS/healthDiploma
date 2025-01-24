import { CrudDocument } from 'wacom';

export interface Healthdisease extends CrudDocument {
	name: string;
	description: string;
	patient: string;
}
