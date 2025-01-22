export const healthplaceFormComponents = {
	formId: 'healthplace',
	title: 'Healthplace',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthplace title',
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
					value: 'fill healthplace description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
