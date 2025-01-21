export const healthpharmacyFormComponents = {
	formId: 'healthpharmacy',
	title: 'Healthpharmacy',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthpharmacy title',
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
					value: 'fill healthpharmacy description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
