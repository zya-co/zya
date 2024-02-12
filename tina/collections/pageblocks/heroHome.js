export const heroHome = {
  name: 'heroHome',
  label: 'Hero Homepage',
  fields: [
    {
      type: 'object',
      name: 'heroHead',
      label: 'Head',
      fields: [
        {
          type: 'string',
          name: 'heroHeadline',
          label: 'Headline',
          ui: {
            component: 'textarea'
          }
        },
        {
          type: 'string',
          name: 'heroSubhead',
          label: 'Subhead'
        },
      ]
    },
    {
      type: 'rich-text',
      name: 'heroContentOne',
      label: 'Content 1',
    },
    {
      type: 'rich-text',
      name: 'heroContentTwo',
      label: 'Content 2'
    }
  ],
  ui: {
    defaultItem: {
      heroHead: {
        heroHeadline: 'Hero Headline',
        heroSubhead: 'This is a hero subhead'
      },
      heroContentOne: {
        children: [
          {
            type: 'h4',
            children: [
              {
                type: 'text',
                text: 'Subtitle',
              },
            ],
          },
          {
            type: 'h2',
            children: [
              {
                type: 'text',
                text: 'Headline',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                type: 'text',
                text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              },
            ],
          },
        ],
      },
      heroContentTwo: {
        children: [
          {
            type: 'h4',
            children: [
              {
                type: 'text',
                text: 'Subtitle',
              },
            ],
          },
          {
            type: 'h2',
            children: [
              {
                type: 'text',
                text: 'Headline',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                type: 'text',
                text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              },
            ],
          },
        ],
      }
    }
  }
}