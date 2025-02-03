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
		},

		{
			name: 'Text',
			key: 'dose',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill dose',
				},
				{
					name: 'Label',
					value: 'Dose',
				}
			]
		},

		{
			name: 'Text',
			key: 'frequency',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill frequency',
				},
				{
					name: 'Label',
					value: 'Frequency',
				}
			]
		},

		{
			name: 'Text',
			key: 'startDate',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill start date',
				},
				{
					name: 'Label',
					value: 'Start date',
				}
			]
		},
	]
}
