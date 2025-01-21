import { CrudDocument } from 'wacom';

export interface Healthdrug extends CrudDocument {
	name: string;
	description: string;
}
