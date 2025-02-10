import { CrudDocument } from 'wacom';

export interface Healthpatient extends CrudDocument {
	name: string;
	description: string;
	dateOfBirth: string;
	gender: string;
	category: string;
	phone: string;
	email: string;
	address: string;
}
