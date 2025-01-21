export const healthrecordFormComponents = {
	formId: 'healthrecord',
	title: 'Healthrecord',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthrecord title',
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
					value: 'fill healthrecord description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
