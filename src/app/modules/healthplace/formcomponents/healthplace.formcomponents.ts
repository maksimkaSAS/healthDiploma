export const healthplaceFormComponents = {
	formId: 'healthplace',
	title: 'Healthplace',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill place name'
				},
				{
					name: 'Label',
					value: 'Name'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill place description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Text',
			key: 'address',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill address'
				},
				{
					name: 'Label',
					value: 'Address'
				}
			]
		},

		{
			name: 'Text',
			key: 'latitude',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill latitude'
				},
				{
					name: 'Label',
					value: 'Latitude'
				}
			]
		},

		{
			name: 'Text',
			key: 'longitude',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill longitude'
				},
				{
					name: 'Label',
					value: 'Longitude'
				}
			]
		},

		{
			name: 'Text',
			key: 'placeType',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill place type'
				},
				{
					name: 'Label',
					value: 'PlaceType'
				}
			]
		}
	]
};
