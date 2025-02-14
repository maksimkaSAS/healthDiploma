export const healthtreatmentFormComponents = {
	formId: 'healthtreatment',
	title: 'Healthtreatment',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthtreatment title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthtreatment description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		},

		{
			name: 'Text',
			key: 'recommendedMedication',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill recommended medication',
				},
				{
					name: 'Label',
					value: 'Recommended medication',
				}
			]
		},

		{
			name: 'Text',
			key: 'duration',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill duration',
				},
				{
					name: 'Label',
					value: 'Duration',
				}
			]
		},

		{
			name: 'Text',
			key: 'precautions',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill precautions',
				},
				{
					name: 'Label',
					value: 'Precautions',
				}
			]
		},

		{
			name: 'Text',
			key: 'patientAdvised',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill patient advised',
				},
				{
					name: 'Label',
					value: 'Patient advised',
				}
			]
		}
	]
}
