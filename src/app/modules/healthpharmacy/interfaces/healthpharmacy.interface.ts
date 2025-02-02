import { CrudDocument } from 'wacom';

export interface Healthpharmacy extends CrudDocument {
	name: string;
	description: string;
	clinic: string;
	address: string;
	phone: string;
	email: string;
	workingHours: string;
	website: string;
	availableMedicines: string;
	deliveryAvailable: string;
}
