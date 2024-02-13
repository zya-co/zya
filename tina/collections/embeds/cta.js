export const cta = {
  name: "Cta",
  label: "Cta",
  fields: [
    {
      name: "label",
      label: "Label",
      type: "string"
    },
    {
      name: 'link',
      label: 'Link',
      type: 'string'
    },
    {
      name: 'color',
      label: 'Color',
      type: 'string',
      options: [
        { 
          value: 'fuchsia', 
          label: 'Fuchsia (pink)' 
        },
        { 
          value: 'lichen', 
          label: 'Lichen (yellow)' 
        }
      ]
    }
  ]
}