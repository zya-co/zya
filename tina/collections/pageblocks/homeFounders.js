import { button } from "../embeds/button"

export const homeFounders = {
  name: 'homeFounders',
  label: 'Home Founders Block',
  fields: [
    {
      type: 'rich-text',
      name: 'intro',
      label: 'Intro', 
      description: 'This is the intro text for the founders section'
    },
    {
      type: 'string',
      name: 'quote',
      label: 'Quote',
      ui: {
        component: 'textarea'
      }
    },
    {
      type: 'object',
      name: 'founders',
      label: 'Founders',
      list: true,
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Name'
        },
        {
          type: 'string',
          name: 'academicTitle',
          label: 'Academic Title'
        },
        {
          type: 'string',
          name: 'jobTitle',
          label: 'Job Title'
        },
        {
          type: 'image',
          name: 'image',
          label: 'Image'
        },
        {
          type: 'string',
          name: 'imageAlt',
          label: 'Image Alt Text'
        }
      ],
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.name}`,
          }
        }
      },
    },
    {
      type: 'object',
      name: 'signoff',
      label: 'Signoff',
      fields: [
        {
          type: 'rich-text',
          name: 'text',
          label: 'Text'
        },
        button
      ]
    }
  ]
}