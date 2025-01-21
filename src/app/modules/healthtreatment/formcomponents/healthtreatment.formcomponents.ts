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
		}
	]
}
