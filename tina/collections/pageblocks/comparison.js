export const comparison = {
  name: 'comparison',
  label: 'Comparison',
  fields: [
    {
      type: 'object',
      name: 'items',
      label: 'Items to compare',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title'
        },
        {
          type: 'object',
          name: 'content',
          label: 'Content',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'label',
              label: 'Label'
            },
            {
              type: 'string',
              name: 'value',
              label: 'Value',
              options: [
                {
                  label: 'Yes',
                  value: 'yes'
                },
                {
                  label: 'No',
                  value: 'no'
                }
              ]
            }
          ],
          ui: {
            itemProps: (contentitem) => {
              return {
                label: `${contentitem.label}`,
              }
            }
          },
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
      ],
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.title}`,
          }
        }
      },
    }
  ]
}