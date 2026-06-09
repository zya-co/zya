const colorOptions = [
  { value: 'earth-gray', label: 'Earth Gray' },
  { value: 'morpho-teal', label: 'Morpho Teal (Dark Blue)' },
  { value: 'mineral-white', label: 'Mineral White' },
  { value: 'lichen', label: 'Lichen' },
  { value: 'fuchsia', label: 'Fuchsia (Pink)' },
  { value: 'beatle', label: 'Beatle (Dark Purple)' },
  { value: 'amber', label: 'Amber' },
]

export const advisoryTeam = {
  name: 'advisoryTeam',
  label: 'Advisory Team',
  fields: [
    {
      type: 'string',
      name: 'bgColor',
      label: 'Background Color',
      description: 'Background color for the section',
      options: colorOptions,
    },
    {
      type: 'string',
      name: 'highlightColor',
      label: 'Highlight Color',
      description: 'Color for advisor titles and connect buttons',
      options: colorOptions,
    },
    {
      type: 'boolean',
      name: 'advisorImageCircleFrame',
      label: 'Circle-Crop Advisor Images',
      description: 'Display advisor portraits in a circular frame',
      default: true,
    },
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
          type: 'object',
          name: 'image',
          label: 'Portrait',
          fields: [
            {
              type: 'image',
              name: 'image',
              label: 'Image'
            },
            {
              type: 'boolean',
              name: 'monochrome',
              label: 'Monochrome',
              description: 'Display the portrait in grayscale',
              default: false,
            },
            {
              type: 'boolean',
              name: 'fullWidth',
              label: 'Full Width',
              description: 'Span the portrait across the full advisor column width',
              default: false,
            },
          ],
        },
        {
          type: 'string',
          name: 'degree',
          label: 'Degree'
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
        },
        {
          type: 'object',
          name: 'secondaryButton',
          label: 'Secondary Button',
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