import { CrudDocument } from 'wacom';

export interface Healthtreatment extends CrudDocument {
	name: string;
	description: string;
	patient: string;
}
