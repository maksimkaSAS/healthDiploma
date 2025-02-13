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
					value: 'Fill name',
				},
				{
					name: 'Label',
					value: 'Name',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'Fill description',
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
					value: 'Fill date of birth',
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
				value: 'Choose gender',
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
					value: 'Choose patient category',
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
					value: 'Fill phone',
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
					value: 'Fill email',
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
					value: 'Fill address',
				},
				{
					name: 'Label',
					value: 'Address',
				}
			]
		},
	]
}
