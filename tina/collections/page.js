/**
 * @type {import('tinacms').Collection}
 */
// import { aboutBlock } from './pageblocks/aboutBlock';
// import { heroBlock } from './pageblocks/heroBlock';
// import { navBlock } from './pageblocks/navBlock';
// import { secondaryNavBlock } from './pageblocks/secondaryNavBlock';
// import { peopleBlock } from './pageblocks/peopleBlock';
// import { platformBlock } from './pageblocks/platformBlock';
// import { workBlock } from './pageblocks/workBlock';
// import { partnershipsBlock } from './pageblocks/partnershipsBlock';
// import { longTextBlock } from './pageblocks/longTextBlock';
// import { footerBlock } from './pageblocks/footerBlock';

export default {
  label: 'Page Content',
  name: 'page',
  path: 'content/page',
  format: 'mdx',
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
      ],
    },
    // {
    //   type: 'object',
    //   list: true,
    //   name: 'blocks',
    //   label: 'Sections',
    //   templates: [ 
    //     navBlock, 
    //     heroBlock, 
    //     aboutBlock, 
    //     secondaryNavBlock, 
    //     peopleBlock, 
    //     platformBlock, 
    //     partnershipsBlock, 
    //     workBlock, 
    //     longTextBlock,
    //     footerBlock 
    //   ],
    // },
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      else {
        return `/${document._sys.filename}`;
      }
      return undefined;
    },
  },
};
