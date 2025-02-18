export const advisoryTeam = {
  name: 'advisoryTeam',
  label: 'Advisory Team',
  fields: [
    {
      type: 'string',
      name: 'advisoryHead',
      label: 'Headline'
    },
    {
      type: 'string',
      name: 'advisorySubhead',
      label: 'Subhead'
    },
    {
      type: 'object',
      name: 'advisors',
      label: 'Advisors',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Name'
        },
        {
          type: 'image',
          name: 'image',
          label: 'Portrait'
        },
        {
          type: 'string',
          name: 'title',
          label: 'Title'
        },
        {
          type: 'string',
          name: 'otherTitle',
          label: 'Other Titles'
        },
        {
          name: 'bio',
          label: 'Bio',
          type: 'string',
          ui: {
            component: 'textarea'
          }
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
        }
      ],
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.name}`,
          }
        }
      },
    }
  ]
}