export const affiliation = {
  name: 'affiliation',
  label: 'Affiliation',
  fields: [
    {
      type: 'string',
      name: 'affilationHead',
      label: 'Headline'
    },
    {
      type: 'object',
      name: 'collaborators',
      label: 'Collaborators',
      list: true,
      fields: [
        {
          type: 'image',
          name: 'collaboratorLogo',
          label: 'Logo'
        },
        {
          type: 'string',
          name: 'collaboratorName',
          label: 'Name'
        },
        {
          type: 'string',
          name: 'collaboratorDescription',
          label: 'Description'
        },
        {
          type: 'object',
          name: 'collaboratorButton',
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
            label: `${item.collaboratorName}`,
          }
        }
      },
    },
    {
      type: 'string',
      name: 'backerHead',
      label: 'Backer Headline'
    },
    {
      type: 'object',
      name: 'backers',
      label: 'Backers',
      list: true,
      fields: [
        {
          type: 'image',
          name: 'backerLogo',
          label: 'Logo'
        },
        {
          type: 'string',
          name: 'backerName',
          label: 'Name'
        }
      ],
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.backerName || 'Backer'}`,
          }
        }
      },
    }
  ]
}