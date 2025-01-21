export const healthsymptomFormComponents = {
	formId: 'healthsymptom',
	title: 'Healthsymptom',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthsymptom title',
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
					value: 'fill healthsymptom description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
