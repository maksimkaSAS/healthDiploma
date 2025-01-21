export const healthanalysisFormComponents = {
	formId: 'healthanalysis',
	title: 'Healthanalysis',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthanalysis title',
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
					value: 'fill healthanalysis description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
