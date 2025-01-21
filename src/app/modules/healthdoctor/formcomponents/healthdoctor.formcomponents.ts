export const healthdoctorFormComponents = {
	formId: 'healthdoctor',
	title: 'Healthdoctor',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthdoctor title',
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
					value: 'fill healthdoctor description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
