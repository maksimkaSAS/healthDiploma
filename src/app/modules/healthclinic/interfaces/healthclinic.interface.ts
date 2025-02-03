import { CrudDocument } from 'wacom';

export interface Healthclinic extends CrudDocument {
	name: string;
	phone: string;
	email: string;
	website: string;
	workingHours: string;
	specialties: string;
	licenseNumber: string;
	clinicType: string;
	description: string;
	record: string;
}
