import { CrudDocument } from 'wacom';

export interface Healthplace extends CrudDocument {
	name: string;
	description: string;
	clinic: string;
	pharmacy: string;
	drug: string;
	address: string;
	latitude: string;
	longitude: string;
	placeType: string;
}
