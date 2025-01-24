import { CrudDocument } from 'wacom';

export interface Healthrecord extends CrudDocument {
	name: string;
	description: string;
	patient: string;
	disease: string;
	treatment: string;
	doctor: string;
	symptom: string;
	analysis: string;
	//clinic: string;
}
