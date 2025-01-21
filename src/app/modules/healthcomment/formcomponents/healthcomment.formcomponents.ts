export const healthcommentFormComponents = {
	formId: 'healthcomment',
	title: 'Healthcomment',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthcomment title',
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
					value: 'fill healthcomment description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
