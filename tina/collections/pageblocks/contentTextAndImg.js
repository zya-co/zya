import { cta } from '../embeds/cta'
import { enzyme } from '../embeds/enzyme'

export const contentTextAndImg = {
  name: 'contentTextAndImg',
  label: 'Content: Text and Image',
  fields: [
    {
      type: 'string',
      name: 'bgColor',
      label: 'Background Color',
      options: [
        { 
          value: 'mineral-white', 
          label: 'Mineral White' 
        },
        { 
          value: 'earth-gray', 
          label: 'Earth Gray' 
        },
        {
          value: 'beatle',
          label: 'Beatle (dark purple)'
        }
      ]
    },
    {
      type: 'string',
      name: 'variant',
      label: 'Variant',
      options: [
        { 
          value: 'imageRightBorder', 
          label: 'Image on right border' 
        },
        { 
          value: 'imageRightWithGap', 
          label: 'Image on right with gap' 
        },
        {
          value: 'imageLeftBorder',
          label: 'Image on left border'
        }
      ]
    },
    {
      type: 'object',
      name: 'image',
      label: 'Image',
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
    }
  ]
}