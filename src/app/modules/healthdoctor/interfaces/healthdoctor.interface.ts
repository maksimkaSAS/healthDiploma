import { CrudDocument } from 'wacom';

export interface Healthdoctor extends CrudDocument {
	name: string;
	description: string;
	clinic: string;
	//patient: string;
	phone: string;
	specialty: string;
	experienceYears: string;
	consultationFee: string;
}
