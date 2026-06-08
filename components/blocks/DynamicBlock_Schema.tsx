import { Template } from 'tinacms';
import { margins, width, spacing, scrollDelay, scrollSpeed } from './DynamicBlock_Schema_Fields';
import { imageBlock, textBlock, textWithPlus, container } from './DynamicBlock_Schema_Blocks';
import { videoBlockSchema } from './DynamicBlock_Blocks/VideoBlock';
import { conversionGraphicSchema } from './Conversion_Graphic';

function getFirstText(item) {
  const firstTextBlock = item?.blocks?.find(block => block._template === 'textBlock');
  const firstTextBlockTextArray = firstTextBlock?.richtext?.children[0]?.children;
  const joinedText = firstTextBlockTextArray?.map(child => child.text || '').join(' ');
  return joinedText || 'Dynamic Block';
}

export const dynamicBlockSchema: Template = {
  name: 'dynamicBlock',
  label: 'Dynamic Block',
  fields: [
    {
      label: 'Anchor',
      name: 'anchor',
      type: 'string',
    },
    spacing as any,
    {
      name: 'background',
      label: 'Background',
      type: 'object',
      fields: [
        {
          label: 'Dark Element?',
          name: 'darkMode',
          type: 'boolean',
          description: 'Select this if the background of this block is dark, so that the navigation will turn white when scrolling over it.'
        },
        {
          name: 'bgImage',
          label: 'Background Image',
          type: 'image',
          description: 'This is for atmospheric background photographs'
        },
        {
          name: 'bgImgPriority',
          label: 'Enable preloading of Background Image?',
          type: 'boolean',
        },
        {
          name: 'bgGraphic',
          label: 'Background Graphic',
          type: 'object',
          description: 'This is for decorative graphics that can appear on top of backgrounds',
          fields: [
            {
              name: 'image',
              label: 'Image',
              type: 'image',
            },
            {
              name: 'aspectRatio',
              label: 'Aspect Ratio',
              type: 'number',
            },
            {
              label: 'Layout Mobile',
              name: 'layoutMobile',
              type: 'object',
              fields: [
                width as any,
                margins as any
              ]
            },
            {
              label: 'Layout Desktop',
              name: 'layoutDesktop',
              type: 'object',
              fields: [
                width as any,
                margins as any
              ]
            },
            scrollSpeed as any,
            scrollDelay as any
          ]
        },
        {
          name: 'bgColor',
          label: 'Background Color',
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
        }
      ]
    },
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'object',
      list: true,
      templates: [
        imageBlock as any,
        textBlock as any,
        textWithPlus as any,
        container as any,
        videoBlockSchema as any,
        conversionGraphicSchema as any
      ],
    }
  ],
  ui: {
    itemProps: (item) => {
      return {
        label: getFirstText(item),
      }
    }
  },
}
