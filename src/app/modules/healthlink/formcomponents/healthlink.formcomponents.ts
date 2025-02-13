export const healthlinkFormComponents = {
	formId: 'healthlink',
	title: 'Healthlink',
	components: [
		{
			name: 'Select',
			key: 'drug',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose drug',
				},
				{
					name: 'Label',
					value: 'Title',
				},

				{
					name: 'Items',
					value: [],
				}
			]
		},
		{
			name: 'Select',
			key: 'place',
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose place',
				},
				{
					name: 'Label',
					value: 'Description',
				},
				{
					name: 'Items',
					value: [],
				}

			]
		},

		{
			name: 'Select',
			key: 'pharmacy',
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose pharmacy',
				},
				{
					name: 'Label',
					value: 'Description',
				},
				{
					name: 'Items',
					value: [],
				}

			]
		}
	]
}
