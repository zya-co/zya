import React from 'react';
import Image from 'next/image';
import { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import styles from './DynamicBlock.module.css';
import { margins, width, spacing, scrollDelay, scrollSpeed } from './DynamicBlock_Schema_Fields';
import {imageBlock, textBlock, textWithPlus, container} from './DynamicBlock_Schema_Blocks';
import { videoBlockSchema } from './DynamicBlock_Blocks/VideoBlock';
import { conversionGraphicSchema } from './Conversion_Graphic';
import Conversion_Graphic from './Conversion_Graphic';
import DarkElement from '../DarkElement';
import TextBlock from './DynamicBlock_Blocks/TextBlock';
import ImageBlock from './DynamicBlock_Blocks/ImageBlock';
import TextWithPlus from './DynamicBlock_Blocks/TextWithPlus';
import Container from './DynamicBlock_Blocks/Container';
import VideoBlock from './DynamicBlock_Blocks/VideoBlock';

export function DynamicBlock({data}) {

  const blockPadding = {
    top: data.spacing?.padding?.top ? `calc(var(--spacing-col) * ${data.spacing.padding.top})` : 'var(--spacing-s)',
    right: data.spacing?.padding?.right ? `calc(var(--spacing-s) + var(--spacing-col) * ${data.spacing.padding.right})` : 'var(--spacing-s)',
    bottom: data.spacing?.padding?.bottom ? `calc(var(--spacing-col) * ${data.spacing.padding.bottom})` : 'var(--spacing-s)',
    left: data.spacing?.padding?.left ? `calc(var(--spacing-s) + var(--spacing-col) * ${data.spacing.padding.left})` : 'var(--spacing-s)',
  }
  const blockPaddingMobile = {
    top: data.spacing?.paddingMobile?.top ? `calc(var(--spacing-col) * ${data.spacing.paddingMobile.top})` : 'var(--spacing-s)',
    right: data.spacing?.paddingMobile?.right ? `calc(var(--spacing-s) + var(--spacing-col) * ${data.spacing.paddingMobile.right})` : 'var(--spacing-s)',
    bottom: data.spacing?.paddingMobile?.bottom ? `calc(var(--spacing-col) * ${data.spacing.paddingMobile.bottom})` : 'var(--spacing-s)',
    left: data.spacing?.paddingMobile?.left ? `calc(var(--spacing-s) + var(--spacing-col) * ${data.spacing.paddingMobile.left})` : 'var(--spacing-s)',
  }

  

  return (
    <DarkElement ignore={ !data.background || !data.background.darkMode || false }>
      <div 
        id={data.anchor || ''}
        className={`dynamicBlock ${styles.dynamicBlock}`}
        style={{
          backgroundColor: data.background?.bgColor ? 'var(--color-'+data.background.bgColor+')' : 'transparent',
          '--padding-top': blockPadding.top,
          '--padding-right': blockPadding.right,
          '--padding-bottom': blockPadding.bottom,
          '--padding-left': blockPadding.left,
          '--padding-top-m': blockPaddingMobile.top,
          '--padding-right-m': blockPaddingMobile.right,
          '--padding-bottom-m': blockPaddingMobile.bottom,
          '--padding-left-m': blockPaddingMobile.left
        } as React.CSSProperties }
        data-tina-field={tinaField(data)}
      >
        {data.background?.bgImage && (
          <figure className={styles.bgImage}>
            <Image 
              src={data.background.bgImage} 
              alt="Atmospheric background image" 
              fill={true}
              sizes="100vw"
              priority={data.background.bgImgPriority}
              className={styles.bgImageImg}
            />
          </figure>
        )}
        {data.background?.bgGraphic?.image && (
          <figure 
            className={styles.bgGraphic}
            data-speed={`clamp(${data.background.bgGraphic.scrollSpeed})`}
            data-lag={`clamp(${data.background.bgGraphic.scrollDelay})`}
            style={{
              '--width-d': data.background.bgGraphic.layoutDesktop?.width ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutDesktop.width})` : '100%',
              '--marginLeft-d': data.background.bgGraphic.layoutDesktop?.margins?.left ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutDesktop.margins.left})` : 'var(--spacing-s)',
              '--marginTop-d': data.background.bgGraphic.layoutDesktop?.margins?.top ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutDesktop.margins.top})` : '0',
              '--marginRight-d': data.background.bgGraphic.layoutDesktop?.margins?.right ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutDesktop.margins.right})` : '0',
              '--marginBottom-d': data.background.bgGraphic.layoutDesktop?.margins?.bottom ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutDesktop.margins.bottom})` : '0',
              '--width-m': data.background.bgGraphic.layoutMobile?.width ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutMobile.width})` : '100%',
              '--marginLeft-m': data.background.bgGraphic.layoutMobile?.margins?.left ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutMobile.margins.left})` : '0',
              '--marginTop-m': data.background.bgGraphic.layoutMobile?.margins?.top ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutMobile.margins.top})` : '0',
              '--marginRight-m': data.background.bgGraphic.layoutMobile?.margins?.right ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutMobile.margins.right})` : '0',
              '--marginBottom-m': data.background.bgGraphic.layoutMobile?.margins?.bottom ? `calc(var(--spacing-col) * ${data.background.bgGraphic.layoutMobile.margins.bottom})` : '0',
            } as React.CSSProperties }
          >
            <Image 
              src={data.background.bgGraphic.image} 
              alt="Decorative background graphic" 
              width={400} 
              height={data.background.bgGraphic.aspectRatio ? 400 / data.background.bgGraphic.aspectRatio : 400}
              sizes={`(min-width: 640.1px) ${6.015625 * data.background.bgGraphic.width}vw, 100vw`}
              className={styles.bgGraphicImg}
            />
          </figure> 
        )}
        {data.blocks?.map((block, i) => {
          {switch (block.__typename) {
            case "BlogpostBlocksDynamicBlockBlocksTextBlock":
              
              return <TextBlock data={block} i={i} key={i+data.__typename} />
            
            case "BlogpostBlocksDynamicBlockBlocksImageBlock":
              
              return <ImageBlock block={block} i={i} key={i+data.__typename} />

            case "BlogpostBlocksDynamicBlockBlocksTextWithPlus":
              
              return <TextWithPlus data={block} key={i+data.__typename} />
            
            case "BlogpostBlocksDynamicBlockBlocksVideoBlock":
              
              return <VideoBlock data={block} key={i+data.__typename} />

            case "PageBlocksDynamicBlockBlocksContainer":
              
              return <Container data={block} key={i+data.__typename} />

            case "PageBlocksDynamicBlockBlocksTextBlock":
              
              return <TextBlock data={block} i={i} key={i+data.__typename} />
            
            case "PageBlocksDynamicBlockBlocksImageBlock":
              
              return <ImageBlock block={block} i={i} key={i+data.__typename} />

            case "PageBlocksDynamicBlockBlocksTextWithPlus":
              
              return <TextWithPlus data={block} key={i+data.__typename} />
            
            case "PageBlocksDynamicBlockBlocksContainer":
              
              return <Container data={block} key={i+data.__typename} />

            case "PageBlocksDynamicBlockBlocksVideoBlock":
              
              return <VideoBlock data={block} key={i+data.__typename} />

            case "PageBlocksDynamicBlockBlocksConversionGraphic":
              
              return <Conversion_Graphic data={block} key={i+data.__typename} />

            default:
              return null
          }}
        })}
          {/* <pre>
            {JSON.stringify(data, null, 2)}
          </pre> */}
      </div>
    </DarkElement>
  )
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

function getFirstText(item) {
  const firstTextBlock = item?.blocks?.find(block => block._template === 'textBlock');
  const firstTextBlockTextArray = firstTextBlock?.richtext?.children[0]?.children;
  const joinedText = firstTextBlockTextArray?.map(child => child.text || '').join(' ');
  return joinedText || 'Dynamic Block';
}