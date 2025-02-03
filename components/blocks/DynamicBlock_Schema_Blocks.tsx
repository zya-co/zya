import { spacing, margins, marginsMobile, width, widthResponsive, marginResponsive, scrollSpeed, scrollDelay } from './DynamicBlock_Schema_Fields';
import { cta } from '../../tina/collections/embeds/cta';
import { customImage } from '../../tina/collections/embeds/customImage';
import { spacer } from '../../tina/collections/embeds/spacer';
import {inlineFormat} from '../../tina/collections/embeds/inlineFormat';

export const textWithPlus = {
  label: 'Text with Plus',
  name: 'textWithPlus',
  type: 'object',
  fields: [
    {
      label: 'Text',
      name: 'text',
      type: 'string',
    },
    {
      label: 'Collapsable Text',
      name: 'collapsableText',
      type: 'string',
      ui: {
        component: 'textarea'
      }
    },
    {
      label: 'Plus position',
      name: 'plusPosition',
      type: 'string',
      options: [
        { label: 'After Text inline (expands left)', value: 'afterInlineLeft' },
        { label: 'After Text inline (expands right)', value: 'afterInlineRight' },
        { label: 'After Text under', value: 'under' },
      ]
    },
    marginResponsive as any,
    width as any,
  ]
}

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
    widthResponsive as any,
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
      toolbarOverride: ['heading', 'link', 'ul', 'ol', 'table', 'embed', 'raw'],
      templates: [ cta, customImage, spacer, inlineFormat ]
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

export const container = {
  label: 'Container',
  name: 'container',
  type: 'object',
  fields: [
    {
      label: 'Inner Blocks',
      name: 'blocks',
      type: 'object',
      list: true,
      templates: [textBlock, imageBlock, textWithPlus],
    },
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
    spacing as any,
    marginResponsive as any,
    widthResponsive as any,
    scrollSpeed as any,
    scrollDelay as any
  ]
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
  else if (item.richtext.children[0].name === 'inlineFormat') {
    return item.richtext.children[0].props.text
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