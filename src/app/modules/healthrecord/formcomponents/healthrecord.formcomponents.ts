export const healthrecordFormComponents = {
	formId: 'healthrecord',
	title: 'Healthrecord',
	components: [

		{
			name: 'Select',
			key: 'type',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose record type'
				},
				{
					name: 'Label',
					value: []
				}
			]
		},

		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill record name'
				},
				{
					name: 'Label',
					value: 'Name'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill record description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},

		{
			name: 'Text',
			key: 'diagnosis',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill diagnosis'
				},
				{
					name: 'Label',
					value: 'Diagnosis'
				}
			]
		},

		// {
		// 	name: 'Text',
		// 	key: 'visitDate',
		// 	fields: [
		// 		{
		// 			name: 'Placeholder',
		// 			value: 'Fill visit date',
		// 		},
		// 		{
		// 			name: 'Label',
		// 			value: 'Visit date',
		// 		}
		// 	]
		// },

		{
			name: 'Text',
			key: 'allergy',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill allergy'
				},
				{
					name: 'Label',
					value: 'Allergy'
				}
			]
		},

		{
			name: 'Text',
			key: 'result',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill result'
				},
				{
					name: 'Label',
					value: 'Result'
				}
			]
		},
		{
			name: 'Text',
			key: 'treatmentType',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill treatment type'
				},
				{
					name: 'Label',
					value: 'Treatment type'
				}
			]
		}
	]
};
