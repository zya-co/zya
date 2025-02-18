export const button = {
  type: 'object',
  name: 'button',
  label: 'Button',
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
    },
    {
      type: 'string',
      name: 'color',
      label: 'Color',
      options: [
        { 
          value: 'fuchsia', 
          label: 'Fuchsia (pink)' 
        },
        { 
          value: 'lichen', 
          label: 'Lichen (yellow)' 
        },
        {
          value: 'mineral-white',
          label: 'Mineral White'
        }
      ]
    }
  ]
}