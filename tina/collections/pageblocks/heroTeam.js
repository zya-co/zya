export const heroTeam = {
  name: 'heroTeam',
  label: 'Team page hero',
  fields: [
    {
      type: 'rich-text',
      name: 'introHead',
      label: 'Intro Head', 
    },
    {
      type: 'rich-text',
      name: 'introLeft',
      label: 'Intro left text', 
    },
    {
      type: 'rich-text',
      name: 'introRight',
      label: 'Intro right text', 
    },
    {
      type: 'object',
      name: 'founders',
      label: 'Founders',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Name'
        },
        {
          type: 'string',
          name: 'academicTitle',
          label: 'Academic Title'
        },
        {
          type: 'string',
          name: 'jobTitle',
          label: 'Job Title'
        },
        {
          type: 'rich-text',
          name: 'bio',
          label: 'Bio'
        },
        {
          type: 'object',
          name: 'button',
          label: 'Connect Button',
          fields: [
            {
              type: 'string',
              name: 'label',
              label: 'Label'
            },
            {
              type: 'string',
              name: 'link',
              label: 'Link'
            }
          ]
        },
        {
          type: 'object',
          name: 'biolink',
          label: 'Science Bio Link',
          fields: [
            {
              type: 'string',
              name: 'label',
              label: 'Label'
            },
            {
              type: 'string',
              name: 'link',
              label: 'Link'
            }
          ]
        },
        {
          type: 'image',
          name: 'image',
          label: 'Image'
        },
        {
          type: 'string',
          name: 'imageAlt',
          label: 'Image Alt Text'
        }
      ],
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.name}`,
          }
        }
      },
    },
    {
      name: 'cta',
      label: 'CTA',
      type: 'object',
      fields: [
        {
          type: 'string',
          name: 'label',
          label: 'Label'
        },
        {
          type: 'string',
          name: 'link',
          label: 'Link'
        }
      ]
    }
  ]
}