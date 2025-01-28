import { wrapFieldsWithMeta } from 'tinacms';

export const spacer = {
  name: 'spacer',
  label: 'Spacer',
  fields: [
    // {
    //   type: 'string',
    //   name: 'height',
    //   label: 'Height',
    //   options: [
    //     {
    //       label: 'Small',
    //       value: 'small'
    //     },
    //     {
    //       label: 'Medium',
    //       value: 'medium'
    //     },
    //     {
    //       label: 'Large',
    //       value: 'large'
    //     }
    //   ]
    // }, 
    {
      name: 'colHeightMobile',
      type: 'number',
      label: 'Height Mobile',
      
    },
    {
      name: 'colHeightDesktop',
      type: 'number',
      label: 'Height Desktop',
      
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