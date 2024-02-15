import { cta } from "../embeds/cta";

export const heroMission = {
  name: 'heroMission',
  label: 'Mission Hero',
  fields: [
    {
      type: 'rich-text',
      name: 'head',
      label: 'Headline',
      templates: [
        cta
      ]
    },
    {
      type: 'object',
      name: 'image',
      label: 'Image',
      fields: [
        {
          type: 'image',
          name: 'src',
          label: 'Image',
        },
        {
          type: 'string',
          name: 'alt',
          label: 'Alt Text',
        },
      ]
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      templates: [
        cta
      ]
    },
  ]
}