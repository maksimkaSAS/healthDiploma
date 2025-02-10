export const healthpatientFormComponents = {
	formId: 'healthpatient',
	title: 'Healthpatient',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill healthpatient title',
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
					value: 'fill healthpatient description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		},

		{
			name: 'Text',
			key: 'dateOfBirth',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill date of birth',
				},
				{
					name: 'Label',
					value: 'Date of birth',
				}
			]
		},

		{
			name: 'Select',
			key: 'gender',
			fields: [
			  {
				name: 'Placeholder',
				value: 'Select gender',
			  },
			  {
				name: 'Label',
				value: 'Gender',
			  },
			  {
				name: 'Items',
				value: ['Male', 'Female'],
			  }
			]
		  },

		{
			name: 'Select',
			key: 'category',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill patient category',
				},
				{
					name: 'Label',
					value: 'Patient category',
				},

				{
				  name: 'Items',
				  value: ['Child', 'Adult', 'Elderly'],
				}
			]
		},

		{
			name: 'Text',
			key: 'phone',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill phone',
				},
				{
					name: 'Label',
					value: 'Phone',
				}
			]
		},

		{
			name: 'Text',
			key: 'email',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill email',
				},
				{
					name: 'Label',
					value: 'Email',
				}
			]
		},

		{
			name: 'Text',
			key: 'address',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill address',
				},
				{
					name: 'Label',
					value: 'Address',
				}
			]
		},
	]
}
