import { tinaField } from 'tinacms/dist/react';
import styles from '../DynamicBlock.module.css';
import Image from 'next/image';

export default function ImageBlock({ block, i }) {
  const imageBlockelements = [
    <figure 
      key={i+block.__typename}
      data-tina-field={tinaField(block)}
      className={styles.imageBlock}
      style={{
        '--marginLeft': block.margins?.marginsDesktop?.left ? `calc(var(--spacing-col) * ${block.margins.marginsDesktop.left})` : '0',
        '--marginTop': block.margins?.marginsDesktop?.top ? `calc(var(--spacing-col) * ${block.margins.marginsDesktop.top})` : '0',
        '--marginRight': block.margins?.marginsDesktop?.right ? `calc(var(--spacing-col) * ${block.margins.marginsDesktop.right})` : '0',
        '--marginBottom': block.margins?.marginsDesktop?.bottom ? `calc(var(--spacing-col) * ${block.margins.marginsDesktop.bottom})` : '0',
        '--marginLeft-m': block.margins?.marginsMobile?.left ? `calc(var(--spacing-col) * ${block.margins.marginsMobile.left})` : '0',
        '--marginTop-m': block.margins?.marginsMobile?.top ? `calc(var(--spacing-col) * ${block.margins.marginsMobile.top})` : '0',
        '--marginRight-m': block.margins?.marginsMobile?.right ? `calc(var(--spacing-col) * ${block.margins.marginsMobile.right})` : '0',
        '--marginBottom-m': block.margins?.marginsMobile?.bottom ? `calc(var(--spacing-col) * ${block.margins.marginsMobile.bottom})` : '0',
        '--width': block.widthResponsive?.widthDesktop ? `calc(var(--spacing-col) * ${block.widthResponsive.widthDesktop})` : '100%',
        '--width-m': block.widthResponsive?.widthMobile ? `calc(var(--spacing-col) * ${block.widthResponsive.widthMobile})` : '100%',
        'borderRadius': block.borderRadius ? `6px` : '0',
      } as React.CSSProperties }
      data-speed={`clamp(${block.scrollSpeed})`}
      data-lag={`clamp(${block.scrollDelay})`}
    >
      {block.link ?
        <a href={block.link} target="_blank">
          <Image 
            src={block.image} 
            alt={block.alt || 'Sorry no alt text provided'} 
            width={400} 
            height={block.aspectRatio ? 400 / block.aspectRatio : 400}
            sizes={`${6.015625 * block.width}vw`}
            style={{
              objectFit: `${block.fillContainer ? 'cover' : 'contain'}`,
              height: `${block.fillContainer ? '100%' : 'auto'}`
            }}
          />
        </a>
        :
        <Image 
          src={block.image} 
          alt={block.alt || 'Sorry no alt text provided'} 
          width={400} 
          height={400}
          sizes={`${6.015625 * block.width}vw`}
          style={{
            objectFit: `${block.fillContainer ? 'cover' : 'contain'}`,
            height: `${block.fillContainer ? '100%' : 'auto'}`
          }}
        />
      }
    </figure>
  ]
  if (block.breakAfter) {
    imageBlockelements.push(
      <div key={`${i + block.__typename}-break`} className={styles.flexBreak}></div>
    );
  }
  return imageBlockelements;
}