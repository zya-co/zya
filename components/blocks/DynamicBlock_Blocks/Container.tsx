import React from 'react';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import styles from './Container.module.css';
import DarkElement from '../../DarkElement';
import TextBlock from '../DynamicBlock_Blocks/TextBlock';
import ImageBlock from '../DynamicBlock_Blocks/ImageBlock';
import TextWithPlus from '../DynamicBlock_Blocks/TextWithPlus';

export default function Container({data}) {

  const blockPadding = {
    top: data.spacing?.padding?.top ? `calc(var(--spacing-col) * ${data.spacing.padding.top})` : '0',
    right: data.spacing?.padding?.right ? `calc(var(--spacing-col) * ${data.spacing.padding.right})` : '0',
    bottom: data.spacing?.padding?.bottom ? `calc(var(--spacing-col) * ${data.spacing.padding.bottom})` : '0',
    left: data.spacing?.padding?.left ? `calc(var(--spacing-col) * ${data.spacing.padding.left})` : '0',
  }
  const blockPaddingMobile = {
    top: data.spacing?.paddingMobile?.top ? `calc(var(--spacing-col) * ${data.spacing.paddingMobile.top})` : '0',
    right: data.spacing?.paddingMobile?.right ? `calc(var(--spacing-col) * ${data.spacing.paddingMobile.right})` : '0',
    bottom: data.spacing?.paddingMobile?.bottom ? `calc(var(--spacing-col) * ${data.spacing.paddingMobile.bottom})` : '0',
    left: data.spacing?.paddingMobile?.left ? `calc(var(--spacing-col) * ${data.spacing.paddingMobile.left})` : '0',
  }

  return (
    <DarkElement ignore={!data.background?.darkMode}>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div 
        className={`${styles.dynamicBlockContainer}`}
        style={{
          backgroundColor: data.background?.bgColor ? 'var(--color-'+data.background.bgColor+')' : 'transparent',
          '--padding-top': blockPadding.top,
          '--padding-right': blockPadding.right,
          '--padding-bottom': blockPadding.bottom,
          '--padding-left': blockPadding.left,
          '--padding-top-m': blockPaddingMobile.top,
          '--padding-right-m': blockPaddingMobile.right,
          '--padding-bottom-m': blockPaddingMobile.bottom,
          '--padding-left-m': blockPaddingMobile.left,
          '--margin-top-d': data.margins?.marginsDesktop?.top ? `calc(var(--spacing-col) * ${data.margins.marginsDesktop.top})` : '0',
          '--margin-right-d': data.margins?.marginsDesktop?.right ? `calc(var(--spacing-col) * ${data.margins.marginsDesktop.right})` : '0',
          '--margin-bottom-d': data.margins?.marginsDesktop?.bottom ? `calc(var(--spacing-col) * ${data.margins.marginsDesktop.bottom})` : '0',
          '--margin-left-d': data.margins?.marginsDesktop?.left ? `calc(var(--spacing-col) * ${data.margins.marginsDesktop.left})` : '0',
          '--margin-top-m': data.margins?.marginsMobile?.top ? `calc(var(--spacing-col) * ${data.margins.marginsMobile.top})` : '0',
          '--margin-right-m': data.margins?.marginsMobile?.right ? `calc(var(--spacing-col) * ${data.margins.marginsMobile.right})` : '0',
          '--margin-bottom-m': data.margins?.marginsMobile?.bottom ? `calc(var(--spacing-col) * ${data.margins.marginsMobile.bottom})` : '0',
          '--margin-left-m': data.margins?.marginsMobile?.left ? `calc(var(--spacing-col) * ${data.margins.marginsMobile.left})` : '0',
          '--width-d': data.widthResponsive?.widthDesktop ? `calc(var(--spacing-col) * ${data.widthResponsive.widthDesktop})` : '100%',
          '--width-m': data.widthResponsive?.widthMobile ? `calc(var(--spacing-col) * ${data.widthResponsive.widthMobile})` : '100%',
          'alignSelf': data.verticalAlignment ? data.verticalAlignment : 'flex-start',
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
              height={400}
              sizes={`(min-width: 640.1px) ${6.015625 * data.background.bgGraphic.width}vw, 100vw`}
              className={styles.bgGraphicImg}
            />
          </figure> 
        )}
        {data.blocks?.map((block, i) => {
          {switch (block.__typename) {
            case "BlogpostBlocksDynamicBlockBlocksContainerBlocksTextBlock":
              
              return <TextBlock data={block} i={i} key={i+data.__typename} />
            
            case "BlogPostBlocksDynamicBlockBlocksContainerBlocksImageBlock":
              
              return <ImageBlock block={block} i={i} key={i+data.__typename} />

            case "BlogPostBlocksDynamicBlockBlocksContainerBlocksTextWithPlus":
              
              return <TextWithPlus data={block} key={i+data.__typename} />

            case "PageBlocksDynamicBlockBlocksContainerBlocksTextBlock":
              
              return <TextBlock data={block} i={i} key={i+data.__typename} />
            
            case "PageBlocksDynamicBlockBlocksContainerBlocksImageBlock":
              
              return <ImageBlock block={block} i={i} key={i+data.__typename} />

            case "PageBlocksDynamicBlockBlocksContainerBlocksTextWithPlus":
              
              return <TextWithPlus data={block} key={i+data.__typename} />
            
            default:
              return null
          }}
        })}
      </div>
    </DarkElement>
  )
}