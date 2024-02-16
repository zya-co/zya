/**
 * @type {import('tinacms').Collection}
 */
import { heroHome } from './pageblocks/heroHome';
import { contentFullSizeImgBg } from './pageblocks/contentFullSizeImgBg';
import { contentTextAndImg } from './pageblocks/contentTextAndImg';
import { homeFounders } from './pageblocks/homeFounders';
import { heroMission } from './pageblocks/heroMission';
import { heroApproach } from './pageblocks/heroApproach';
import { contentText } from './pageblocks/contentText';
import { comparison } from './pageblocks/comparison';
import { heroTeam } from './pageblocks/heroTeam';
import { advisoryTeam } from './pageblocks/advisoryTeam';
import { affiliation } from './pageblocks/affiliation';

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
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      templates: [ 
        heroHome,
        heroMission,
        heroApproach,
        heroTeam,
        contentFullSizeImgBg,
        contentTextAndImg,
        contentText,
        homeFounders,
        comparison,
        advisoryTeam,
        affiliation
      ],
    },
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
