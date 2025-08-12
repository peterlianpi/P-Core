export const teamFormConfig = {
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Organization Name',
      placeholder: 'Organization Name',
      validation: { required: true, minLength: 3, maxLength: 50 },
      component: 'input',
      grid: { md: 2 }
    },
    {
      name: 'startedAt',
      type: 'date',
      label: 'Started At',
      component: 'date-picker',
      validation: { required: true }
    },
    {
      name: 'type',
      type: 'select',
      label: 'Team Type',
      options: [
        { value: 'SCHOOL', label: 'School' },
        { value: 'TRAINING_CENTER', label: 'Training Center' },
        { value: 'CORPORATE', label: 'Corporate' },
        { value: 'CHURCH', label: 'Church' },
        { value: 'OTHER', label: 'Other' }
      ],
      validation: { required: true }
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Description',
      validation: { maxLength: 500 },
      component: 'textarea',
      grid: { md: 3 }
    },
    {
      name: 'logoImage',
      type: 'image',
      label: 'Team Logo',
      component: 'image-upload',
      validation: { required: false }
    }
  ]
};

export type TeamFormField = typeof teamFormConfig.fields[0];
