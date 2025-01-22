import { CrudDocument } from 'wacom';

export interface Healthplace extends CrudDocument {
	name: string;
	description: string;
}
