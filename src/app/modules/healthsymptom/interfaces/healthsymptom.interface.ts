import { CrudDocument } from 'wacom';

export interface Healthsymptom extends CrudDocument {
	name: string;
	description: string;
}
