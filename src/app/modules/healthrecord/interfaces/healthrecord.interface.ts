import { CrudDocument } from 'wacom';

export interface Healthrecord extends CrudDocument {
	name: string;
	description: string;
}
