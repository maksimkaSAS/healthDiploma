export const healthdiseaseFormComponents = {
	formId: 'healthdisease',
	title: 'Healthdisease',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthdisease title',
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
					value: 'fill healthdisease description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
