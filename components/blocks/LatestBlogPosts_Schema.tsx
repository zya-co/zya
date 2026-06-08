import { Template } from 'tinacms';

export const latestBlogPostsSchema: Template = {
  name: 'latestBlogPosts',
  label: 'Latest Blog Posts',
  fields: [
    {
      label: 'Dark Element?',
      name: 'darkElement',
      type: 'boolean',
    },
    {
      name: 'intro',
      label: 'Title',
      type: 'rich-text',
    },
    {
      label: 'Text Color',
      name: 'textColor',
      type: 'string',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Mineral White', value: 'mineral-white' },
        { label: 'Earth Gray', value: 'earth-gray' },
        { label: 'Morpho Teal', value: 'morpho-teal' },
        { label: 'Lichen', value: 'lichen' },
        { label: 'Fuchsia', value: 'fuchsia' },
        { label: 'Beatle', value: 'beatle' },
        { label: 'Amber', value: 'amber' },
      ]
    },
    {
      label: 'Background Color',
      name: 'backgroundColor',
      type: 'string',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Mineral White', value: 'mineral-white' },
        { label: 'Earth Gray', value: 'earth-gray' },
        { label: 'Morpho Teal', value: 'morpho-teal' },
        { label: 'Lichen', value: 'lichen' },
        { label: 'Fuchsia', value: 'fuchsia' },
        { label: 'Beatle', value: 'beatle' },
        { label: 'Amber', value: 'amber' },
      ]
    },
    {
      label: 'Show more?',
      description: 'Show more than 3 blog posts on demand',
      name: 'showMore',
      type: 'boolean'
    }
  ],
}
