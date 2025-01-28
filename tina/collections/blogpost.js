/**
 * @type {import('tinacms').Collection}
 */
import { dynamicBlockSchema } from '../../components/blocks/DynamicBlock';

export default {
  label: 'Blog Posts',
  name: 'blogpost',
  path: 'content/blog',
  format: 'mdx',
  defaultItem: () => ({
    meta: {
      date: new Date().toISOString(), // Prepopulate with today's date
      author: 'Joshua Sauer'
    },
    blocks: [
      {
        _template: 'dynamicBlock',
        spacing: {
          padding: {
            top: 2,
            right: 1,
            bottom: 1.5,
            left: 1,
          },
          paddingMobile: {
            top: 2.5,
            right: null,
            bottom: 1,
            left: null,
          }
        },
        background: {
          darkMode: true,
          bgColor: 'beatle'
        },
        blocks: [
          {
            _template: 'textBlock',
            color: 'fuchsia',
            richtext: {
              type: "root",
              children: [
                {
                  type: "h4",
                  children: [
                    {
                      type: "text",
                      text: "The Science behind headlines"
                    }
                  ]
                },
                {
                  type: "h1",
                  children: [
                    {
                      type: "text",
                      text: "The are big and interesting"
                    }
                  ]
                }
              ]
            },
            margins: {
              top: null,
              right: 0,
              bottom: null,
              left: null,
            },
            width: 12,
          },
          {
            _template: 'textBlock',
            color: 'fuchsia',
            richtext: {
              type: "root",
              children: [
                {
                  type: "h4",
                  children: [
                    {
                      type: "text",
                      text: "Placeholder text not so much. It really only exists to literally hold space. It's good at that, but nothing else: Lorem ipsum odor amet."
                    }
                  ]
                }
              ]
            },
            margins: {
              top: 0.5,
              right: null,
              bottom: null,
              left: null,
            },
            width: 10,
          }
        ]
      },
      {
        _template: 'dynamicBlock',
        spacing: {
          padding: {
            top: 2,
            right: 1,
            bottom: 1.5,
            left: 1,
          },
          paddingMobile: {
            top: 2.5,
            right: null,
            bottom: 1,
            left: null,
          }
        },
        background: {
          bgColor: 'mineral-white'
        },
        blocks: [
          {
            _template: 'textBlock',
            color: 'beatle',
            richtext: {
              type: 'root',
              children: [
                {
                  type: "h3",
                  children: [
                    {
                      type: "text",
                      text: "Lorem ipsum odor amet"
                    }
                  ]
                },
                {
                  type: "p",
                  children: [
                    {
                      type: "text",
                      text: "Consectetuer adipiscing elit. Nulla accumsan purus donec cubilia id non proin. Bibendum id euismod commodo sed velit urna potenti non. Conubia nostra sollicitudin sed; morbi dapibus a eget in. Natoque molestie elementum maecenas himenaeos proin congue cursus. Nisl conubia enim pretium sagittis eget aptent massa. Est congue parturient viverra; magna cursus habitasse facilisi nisi. Aptent semper posuere primis efficitur ornare ante ultrices proin."
                    }
                  ]
                },
                {
                  type: "p",
                  children: [
                    {
                      type: "text",
                      text: "Sollicitudin mattis fames quis parturient conubia. Neque lacus dictum sodales efficitur feugiat efficitur himenaeos. Tellus conubia integer aliquet proin donec, nec vivamus mattis. Pellentesque in eu natoque netus lacinia facilisi laoreet conubia suscipit. Velit fringilla ad enim; donec tristique suscipit. Tortor pellentesque aptent ac nam est maecenas tristique? Vulputate ultrices eleifend proin fermentum pretium, quis facilisis blandit. Malesuada montes penatibus praesent pharetra pellentesque ultrices finibus lobortis. Maecenas risus vehicula venenatis ullamcorper justo dis cras quisque."
                    }
                  ]
                },
                {
                  type: "p",
                  children: [
                    {
                      type: "text",
                      text: "Consequat facilisis malesuada faucibus ex mattis? Eget duis pharetra aliquet gravida quam etiam est. Ut tempor porttitor maximus metus ridiculus facilisi. Inceptos aenean platea; facilisis eget lacinia fames semper. Egestas nulla morbi potenti; ut pellentesque feugiat litora varius. Ex fames himenaeos congue turpis erat augue. Amet diam elementum ligula pretium sollicitudin malesuada etiam ut."
                    }
                  ]
                },
                {
                  type: "p",
                  children: [
                    {
                      type: "text",
                      text: "Varius magnis libero sit integer leo. Dolor potenti mi ullamcorper facilisi aenean. Volutpat erat blandit volutpat leo hendrerit arcu. Ad vel sit consectetur scelerisque maximus curabitur orci aliquet? Efficitur orci etiam suscipit mus enim. Semper pretium vitae felis placerat, penatibus pretium. Proin proin lobortis urna sodales purus ad etiam commodo. Leo sit elit senectus mi; curae congue."
                    }
                  ]
                },
                {
                  type: "p",
                  children: [
                    {
                      type: "text",
                      text: "Pretium himenaeos massa primis posuere euismod, mattis magna sed facilisis. Quam elementum leo lacus, mi turpis nulla etiam dis? Ornare euismod ac class viverra accumsan elementum. Tempus odio euismod lobortis vitae mus odio maximus eu nec. Dignissim metus dapibus amet nibh purus mattis ultricies. Mauris sociosqu nam sagittis aptent magnis sapien suscipit quis. Gravida porttitor lobortis primis etiam ex. Nulla phasellus vulputate sapien a dolor a senectus nulla."
                    }
                  ]
                }
              ]
            },
            width: 10
          }
        ]
      }
    ],
  }),
  fields: [
    {
      name: 'meta',
      label: 'Meta/SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
          ui: {
            component: 'textarea',
          }
        },
        {
          name: 'image',
          label: 'OpenGraph Image',
          type: 'image',
        },
        {
          name: 'date',
          label: 'Date',
          type: 'datetime',
        },
        {
          name: 'category',
          label: 'Category',
          type: 'string',
        },
        {
          name: 'author',
          label: 'Author',
          type: 'string',
        }
      ],
    },
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      templates: [ 
        dynamicBlockSchema,
      ],
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/blog/${document._sys.filename}`;
    }
  },
};
