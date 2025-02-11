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
					value: 'fill healthlink title',
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
					value: 'fill healthlink description',
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
					value: 'fill healthlink description',
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
