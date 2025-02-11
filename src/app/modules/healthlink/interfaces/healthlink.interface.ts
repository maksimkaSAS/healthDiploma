import { CrudDocument } from 'wacom';

export interface Healthlink extends CrudDocument {
	name: string;
	description: string;
}
