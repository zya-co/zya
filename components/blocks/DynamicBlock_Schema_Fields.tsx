import React from 'react'; // Add this import
import { wrapFieldsWithMeta } from 'tinacms';

export const scrollSpeed = {
  name: 'scrollSpeed',
  label: 'Scroll Speed',
  type: 'number',
  ui: {
    parse: (val) => Number(val),
    component: wrapFieldsWithMeta(({ input }) => {
      return (
        <input type='number' {...input} step={0.1} style={{padding: '0.25rem 0.5rem'}} />
      )
    })
  }
}

export const scrollDelay = {
  name: 'scrollDelay',
  label: 'Scroll Delay',
  type: 'number',
  ui: {
    parse: (val) => Number(val),
    component: wrapFieldsWithMeta(({ input }) => {
      return (
        <input type='number' {...input} step={0.1} style={{padding: '0.25rem 0.5rem'}} />
      )
    })
  }
}


export const width = {
  label: 'Width (in Columns)',
  name: 'width',
  type: 'number',
  ui: {
    parse: (val) => Number(val),
    // wrapping our component in wrapFieldsWithMeta renders our label & description.
    component: wrapFieldsWithMeta(({ field, input, meta }) => {
      return (
        <div>
          <input type="range" min="0" max="16" step=".5" {...input} style={{width: '100%'}}/>
          <br />
          Value: {input.value}
        </div>
      )
    })
  }
}

export const widthResponsive = {
  label: 'Width (in Columns)',
  name: 'widthResponsive',
  type: 'object',
  fields: [
    {
      label: 'Width Desktop',
      name: 'widthDesktop',
      type: 'number',
      ui: {
        parse: (val) => Number(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input type="range" min="0" max="16" step=".5" {...input} style={{width: '100%'}}/>
              <br />
              Value: {input.value}
            </div>
          )
        })
      }
    },
    {
      label: 'Width Mobile',
      name: 'widthMobile',
      type: 'number',
      ui: {
        parse: (val) => Number(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input type="range" min="0" max="16" step=".5" {...input} style={{width: '100%'}}/>
              <br />
              Value: {input.value}
            </div>
          )
        })
      }
    }
  ]
}

export const spacing = {
  label: 'Inner Spacing',
  name: 'spacing',
  type: 'object',
  fields: [
    {
      label: 'Inner Spacing Desktop',
      name: 'padding',
      type: 'object',
      fields: [
        {
          label: 'Top',
          name: 'top',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Right',
          name: 'right',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Bottom',
          name: 'bottom',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Left',
          name: 'left',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                 <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                           <br />
                           Value: {input.value}
                </div>
              )
            })
          }
        }
      ] 
    },
    {
      label: 'Inner Spacing Mobile',
      name: 'paddingMobile',
      type: 'object',
      fields: [
        {
          label: 'Top',
          name: 'top',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Right',
          name: 'right',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Bottom',
          name: 'bottom',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Left',
          name: 'left',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        }
      ] 
    }
  ]
}

export const marginResponsive = {
  label: 'Margins',
  name: 'margins',
  type: 'object',
  fields: [
    {
      label: 'Outer Spacing Desktop',
      name: 'marginsDesktop',
      type: 'object',
      fields: [
        {
          label: 'Top',
          name: 'top',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Right',
          name: 'right',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Bottom',
          name: 'bottom',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Left',
          name: 'left',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                 <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                           <br />
                           Value: {input.value}
                </div>
              )
            })
          }
        }
      ] 
    },
    {
      label: 'Outer Spacing Mobile',
      name: 'marginsMobile',
      type: 'object',
      fields: [
        {
          label: 'Top',
          name: 'top',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Right',
          name: 'right',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Bottom',
          name: 'bottom',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        },
        {
          label: 'Left',
          name: 'left',
          type: 'number',
          ui: {
            parse: (val) => parseFloat(val),
            // wrapping our component in wrapFieldsWithMeta renders our label & description.
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input type="range" min="-16" max="16" step=".5" {...input} style={{width: '100%'}}/>
                  <br />
                  Value: {input.value}
                </div>
              )
            })
          }
        }
      ] 
    }
  ]
}

export const margins = {
  label: 'Margins',
  name: 'margins',
  type: 'object',
  fields: [
    {
      label: 'Top',
      name: 'top',
      type: 'number',
      ui: {
        parse: (val) => parseFloat(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input
                id="marginTop"
                type="number"
                min="-8"
                max="16"
                step=".5"
                placeholder='0'
                style={{ padding: '0.25rem 0rem 0.25rem 1rem' }}
                // This will pass along props.input.onChange to set our form values as this input changes.
                {...input}
              />&nbsp;Columns
            </div>
          )
        })
      }
    },
    {
      label: 'Right',
      name: 'right',
      type: 'number',
      ui: {
        parse: (val) => parseFloat(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input
                id="marginRight"
                type="number"
                min="-8"
                max="16"
                step=".5"
                placeholder='0'
                style={{ padding: '0.25rem 0rem 0.25rem 1rem' }}
                // This will pass along props.input.onChange to set our form values as this input changes.
                {...input}
              />&nbsp;Columns
            </div>
          )
        })
      }
    },
    {
      label: 'Bottom',
      name: 'bottom',
      type: 'number',
      ui: {
        parse: (val) => parseFloat(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input
                id="marginBottom"
                type="number"
                min="-8"
                max="16"
                step=".5"
                placeholder='0'
                style={{ padding: '0.25rem 0rem 0.25rem 1rem' }}
                // This will pass along props.input.onChange to set our form values as this input changes.
                {...input}
              />&nbsp;Columns
            </div>
          )
        })
      }
    },
    {
      label: 'Left',
      name: 'left',
      type: 'number',
      ui: {
        parse: (val) => parseFloat(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input
                id="marginLeft"
                type="number"
                min="-8"
                max="16"
                step=".5"
                placeholder='0'
                style={{ padding: '0.25rem 0rem 0.25rem 1rem' }}
                // This will pass along props.input.onChange to set our form values as this input changes.
                {...input}
              />&nbsp;Columns
            </div>
          )
        })
      }
    }
  ] 
}
export const marginsMobile = {
  label: 'Margins Mobile',
  name: 'marginsMobile',
  type: 'object',
  fields: [
    {
      label: 'Top',
      name: 'top',
      type: 'number',
      ui: {
        parse: (val) => parseFloat(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input
                id="marginTop"
                type="number"
                min="-8"
                max="16"
                step=".5"
                placeholder='0'
                style={{ padding: '0.25rem 0rem 0.25rem 1rem' }}
                // This will pass along props.input.onChange to set our form values as this input changes.
                {...input}
              />&nbsp;Columns
            </div>
          )
        })
      }
    },
    {
      label: 'Right',
      name: 'right',
      type: 'number',
      ui: {
        parse: (val) => parseFloat(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input
                id="marginRight"
                type="number"
                min="-8"
                max="16"
                step=".5"
                placeholder='0'
                style={{ padding: '0.25rem 0rem 0.25rem 1rem' }}
                // This will pass along props.input.onChange to set our form values as this input changes.
                {...input}
              />&nbsp;Columns
            </div>
          )
        })
      }
    },
    {
      label: 'Bottom',
      name: 'bottom',
      type: 'number',
      ui: {
        parse: (val) => parseFloat(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input
                id="marginBottom"
                type="number"
                min="-8"
                max="16"
                step=".5"
                placeholder='0'
                style={{ padding: '0.25rem 0rem 0.25rem 1rem' }}
                // This will pass along props.input.onChange to set our form values as this input changes.
                {...input}
              />&nbsp;Columns
            </div>
          )
        })
      }
    },
    {
      label: 'Left',
      name: 'left',
      type: 'number',
      ui: {
        parse: (val) => parseFloat(val),
        // wrapping our component in wrapFieldsWithMeta renders our label & description.
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          return (
            <div>
              <input
                id="marginLeft"
                type="number"
                min="-8"
                max="16"
                step=".5"
                placeholder='0'
                style={{ padding: '0.25rem 0rem 0.25rem 1rem' }}
                // This will pass along props.input.onChange to set our form values as this input changes.
                {...input}
              />&nbsp;Columns
            </div>
          )
        })
      }
    }
  ] 
}