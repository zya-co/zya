import { cta } from "../embeds/cta";
import { enzyme } from "../embeds/enzyme";

export const contentFullSizeImgBg = {
  name: 'contentFullSizeImgBg',
  label: 'Content Full Size Image Background',
  fields: [
    {
      type: 'object',
      name: 'bgImage',
      label: 'Background Image',
      fields: [
        {
          type: 'image',
          name: 'image',
          label: 'Image'
        },
        {
          type: 'string',
          name: 'alt',
          label: 'Alt Text'
        }
      ]
    },
    {
      type: 'rich-text',
      name: 'content',
      label: 'Content',
      templates: [ cta, enzyme ]
    }, 
    {
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
            }
          ]
        }
      ]
    }
  ]
}