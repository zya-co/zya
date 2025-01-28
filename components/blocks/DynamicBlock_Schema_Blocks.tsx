import { margins, marginsMobile, width, marginResponsive, scrollSpeed, scrollDelay } from './DynamicBlock_Schema_Fields';
import { cta } from '../../tina/collections/embeds/cta';
import { customImage } from '../../tina/collections/embeds/customImage';
import { spacer } from '../../tina/collections/embeds/spacer';

export const imageBlock = {
  label: 'Image Block',
  name: 'imageBlock',
  type: 'object',
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'image',
      description: 'This is for images that can appear on the left or right of text blocks'
    },            
    {
      label: 'Break after?',
      name: 'breakAfter',
      type: 'boolean'              
    },
    marginResponsive as any,
    width as any,
    scrollSpeed as any,
    scrollDelay as any
  ]
}

export const textBlock = {
  name: 'textBlock',
  label: 'Text Block',
  fields: [
    {
      label: 'Color theme',
      name: 'color',
      type: 'string',
      options: [
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
      label: 'Content',
      name: 'richtext',
      type: 'rich-text',
      toolbarOverride: ['heading', 'link', 'ul', 'ol', 'table', 'embed'],
      templates: [ cta, customImage, spacer ]
    },
    { 
      label: 'alignment',
      name: 'alignment',
      type: 'string',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Left bottom', value: 'left_bottom' },
        { label: 'Right bottom', value: 'right_bottom' },
      ]
    },
    margins as any,
    marginsMobile as any,
    width as any,
    {
      label: 'Break after?',
      name: 'breakAfter',
      type: 'boolean'              
    },
    scrollSpeed as any,
    scrollDelay as any
  ],
  ui: {
    itemProps: (item) => {
      return {
        label: getFirstText(item),
      }
    }
  },
}

function getFirstText(item) {
  if (!item.richtext || !item.richtext.children ) {
    return 'Empty Block';
  }
  else if (item.richtext.children[0].name === 'Cta') {
    return 'CTA Button';
  } 
  else if (item.richtext.children[0].name === 'customImage') {
    const imageDescription = item.richtext.children[0].props.alt
    if (imageDescription) {
      return 'Image: ' + imageDescription;
    } 
    else {
      return 'Custom Image';
    }
  } 
  else {
    const fullText = item.richtext.children[0].children.map((child) => {
      if (child.type === 'text') {
        return child.text;
      }
    }).join(' ');
    return fullText;
  }
}