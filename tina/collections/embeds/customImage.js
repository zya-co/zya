import React from 'react'; // Add this import
import { wrapFieldsWithMeta } from 'tinacms';

export const customImage = {
  name: 'customImage',
  label: 'Image',
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
      name: 'caption',
      label: 'Caption',
      type: 'string',
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
    },
    {
      name: 'widthMobile',
      label: 'MaxWidth (Mobile)',
      type: 'number',
      ui: {
        component: wrapFieldsWithMeta(({ input }) => customUI(input))
      }
    },
    {
      name: 'widthDesktop',
      label: 'MaxWidth (Desktop)',
      type: 'number',
      default: 3,
      ui: {
        component: wrapFieldsWithMeta(({ input }) => customUI(input))
      }
    },
    {
      name: 'heightMobile',
      label: 'MaxHeight (Mobile)',
      type: 'number',
      ui: {
        component: wrapFieldsWithMeta(({ input }) => customUI(input))
      }
    },
    {
      name: 'heightDesktop',
      label: 'MaxHeight (Desktop)',
      type: 'number',
      default: 3,
      ui: {
        component: wrapFieldsWithMeta(({ input }) => customUI(input))
      }
    },
    {
      type: 'string',
      name: 'separator',
      label: 'Separator',
      component: () => <hr style={{ 
        margin: '20px 0px',
        width: '100%',
        height: '1px',
        background: '#DDD'
       }} />,
    },
    {
      name: 'marginTop',
      label: 'Margin Top',
      type: 'number',
      ui: {
        component: wrapFieldsWithMeta(({ input }) => customUI(input))
      }
    },
    {
      name: 'marginBottom',
      label: 'Margin Bottom',
      type: 'number',
      ui: {
        component: wrapFieldsWithMeta(({ input }) => customUI(input))
      }
    }
  ]
}

function customUI(input) {
  return (
    <div className='customUI'>
      <style>
        {`
          div:has( > .customUI) {
            width: 50%;
            float:left;
            box-sizing: border-box;
            padding: 0 1em 0 0;
          }
        `}
      </style>
      <input type="number" min="0" max="16" step=".5" {...input} style={{borderRadius: '3px', padding: '.5em'}}/> Cols
    </div>
  )
}