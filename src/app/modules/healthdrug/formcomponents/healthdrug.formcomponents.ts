export const healthdrugFormComponents = {
	formId: 'healthdrug',
	title: 'Healthdrug',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthdrug title',
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
					value: 'fill healthdrug description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
