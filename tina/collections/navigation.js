export default {
  label: 'Navigation',
  name: 'navigation',
  path: 'content/navigation',
  format: 'mdx',
  fields: [
    {
      type: 'object',
      name: 'navItem',
      label: 'Navigation Item',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.navItemLabel}`,
          }
        }
      },
      fields: [
        {
          type: 'string',
          name: 'navItemLabel',
          label: 'Label'
        },
        {
          type: 'string',
          name: 'navItemLink',
          label: 'Link'
        },
        {
          name: 'subNavItems',
          label: 'Subnav Items',
          type: 'object',
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: `${item.subNavItemLabel}`,
              }
            }
          },
          fields: [
            {
              type: 'string',
              name: 'subNavItemLabel',
              label: 'Label'
            },
            {
              type: 'string',
              name: 'subNavItemLink',
              label: 'Link'
            }
          ]
        }
      ]
    },
    {
      type: 'object',
      name: 'cta',
      label: 'Call to Action',
      fields: [
        {
          type: 'string',
          name: 'ctaLabel',
          label: 'Label'
        },
        {
          type: 'string',
          name: 'ctaLink',
          label: 'Link'
        }
      ]
    },
    {
      name: 'hygiene',
      label: 'Footer Hygiene',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.hygieneLabel}`,
          }
        }
      },
      fields: [
        {
          type: 'string',
          name: 'hygieneLabel',
          label: 'Label'
        },
        {
          type: 'string',
          name: 'hygieneLink',
          label: 'Link'
        }
      ]
    }
  ]
}