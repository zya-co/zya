import { spacer } from "../embeds/spacer"
import { cta } from "../embeds/cta"
import { enzyme } from "../embeds/enzyme"

export const contentText = {
  name: 'contentText',
  label: 'Content Text',
  fields: [
    {
      type: 'string',
      name: 'bgColor',
      label: 'Background Color',
      description: 'Set the background color of the section',
      options: [
        {
          label: 'White',
          value: 'mineral-white'
        },
        {
          label: 'Morpho Teal (Dark Blue)',
          value: 'morpho-teal'
        },
        {
          label: 'Beatle (Dark Purple)',
          value: 'beatle'
        }
      ]
    },
    {
      type: 'string',
      name: 'textColor',
      label: 'Text Color',
      description: 'Set the text color of the section',
      options: [
        {
          label: 'White',
          value: 'mineral-white'
        },
        {
          label: 'Morpho Teal (Dark Blue)',
          value: 'morpho-teal'
        },
        {
          label: 'Beatle (Dark Purple)',
          value: 'beatle'
        },
        {
          label: 'Fuchsia (Pink)',
          value: 'fuchsia'
        }
      ]
    },
    {
      type: 'rich-text',
      name: 'content',
      label: 'Content',
      templates: [
        spacer, enzyme, cta
      ]
    }
  ]
}