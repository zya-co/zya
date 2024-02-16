import { cta } from "../embeds/cta";

export const heroApproach = {
  name: 'heroApproach',
  label: 'Approach Page Hero',
  fields: [
    {
      type: 'rich-text',
      name: 'head',
      label: 'Headline',
      templates: [
        cta
      ]
    }
  ]
}