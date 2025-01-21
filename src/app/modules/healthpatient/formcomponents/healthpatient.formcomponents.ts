export const healthpatientFormComponents = {
	formId: 'healthpatient',
	title: 'Healthpatient',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthpatient title',
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
					value: 'fill healthpatient description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
