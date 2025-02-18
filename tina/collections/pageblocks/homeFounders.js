export const homeFounders = {
  name: 'homeFounders',
  label: 'Home Founders Block',
  fields: [
    {
      type: 'rich-text',
      name: 'intro',
      label: 'Intro', 
      description: 'This is the intro text for the founders section'
    },
    {
      type: 'string',
      name: 'quote',
      label: 'Quote',
      ui: {
        component: 'textarea'
      }
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
          type: 'image',
          name: 'image',
          label: 'Image'
        },
        {
          type: 'string',
          name: 'imageAlt',
          label: 'Image Alt Text'
        },
        {
          label: 'Expandable Content',
          name: 'expandableContent',
          type: 'object',
          fields: [
            {
              type: 'rich-text',
              name: 'content',
              label: 'Content',
            },
            {
              label: 'CTA',
              name: 'cta',
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