export const healthtradeFormComponents = {
	formId: 'healthtrade',
	title: 'Healthtrade',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthtrade title',
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
					value: 'fill healthtrade description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
