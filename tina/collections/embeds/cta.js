export const cta = {
  name: "Cta",
  label: "Cta",
  type: "object",
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
      name: 'variant',
      label: 'Variant',
      type: 'string',
      options: [
        {
          value: 'arrowLeft',
          label: '→ Arrow Left (default)'
        },
        {
          value: 'arrowRight',
          label: 'Arrow Right ↗️'
        },
        {
          value: 'arrowLeftMini',
          label: '→ Arrow Left Mini'
        },
        {
          value: 'arrowRightMini',
          label: 'Arrow Right Mini ↗️'
        }
      ]
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
        },
        {
          value: 'mineral-white',
          label: 'Mineral White'
        }
      ]
    }
  ]
}