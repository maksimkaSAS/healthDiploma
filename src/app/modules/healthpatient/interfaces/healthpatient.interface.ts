import { CrudDocument } from 'wacom';

export interface Healthpatient extends CrudDocument {
	name: string;
	description: string;
}
