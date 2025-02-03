import { wrapFieldsWithMeta } from 'tinacms';

export const inlineFormat = {
  type: 'object',
  name: 'inlineFormat',
  label: 'Text with special formatting',
  fields: [
    {
      type: 'string',
      name: 'text',
      label: 'Text to be formatted'
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
    },
    {
      type: 'boolean',
      name: 'underlined',
      label: 'Underlined',
    }
  ],
  ui: {
    component: wrapFieldsWithMeta(({ input }) => {
      return (
        <div>Hankenstein</div>
      )  
    })
  }
}