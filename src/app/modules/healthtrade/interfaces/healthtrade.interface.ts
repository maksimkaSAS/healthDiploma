import { CrudDocument } from 'wacom';

export interface Healthtrade extends CrudDocument {
	name: string;
	description: string;
	place: string;
}
