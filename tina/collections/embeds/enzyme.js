export const enzyme = {
  name: 'enzyme',
  label: 'Enzyme',
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
    },
    {
      type: 'string',
      name: 'alignment',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ]
    }
  ]
}