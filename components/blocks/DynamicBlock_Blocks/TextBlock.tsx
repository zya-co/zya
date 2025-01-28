import { tinaField } from 'tinacms/dist/react';
import styles from '../DynamicBlock.module.css';
import RichText from '../../RichText';

export default function TextBlock({ data, i }) {
  const classNames = [
    styles.richtext,
    data.alignment === 'center' && styles.richtext_centerAligned,
    data.alignment === 'right' && styles.richtext_rightAligned,
    data.alignment === 'left_bottom' && styles.richtext_leftBottomAligned,
    data.alignment === 'right_bottom' && styles.richtext_rightBottomAligned,
    styles[`richtext_width_${data.width}`],      
    data.breakAfter && styles.richtext_breakAfter,        
  ].filter(Boolean).join(' ')
  
  const textBlockElements = [
      <div 
        key={i+data.__typename}
        data-tina-field={tinaField(data)}
        className={classNames}
        style={{
          color: data.color ? 'var(--color-'+data.color+')' : 'inherit',
          '--marginLeft': data.margins?.left ? `calc(var(--spacing-col) * ${data.margins.left})` : '0',
          '--marginTop': data.margins?.top ? `calc(var(--spacing-col) * ${data.margins.top})` : '0',
          '--marginRight': data.margins?.right ? `calc(var(--spacing-col) * ${data.margins.right})` : '0',
          '--marginBottom': data.margins?.bottom ? `calc(var(--spacing-col) * ${data.margins.bottom})` : '0',
          '--marginLeft-m': data.marginsMobile?.left ? `calc(var(--spacing-col) * ${data.marginsMobile.left})` : '0',
          '--marginTop-m': data.marginsMobile?.top ? `calc(var(--spacing-col) * ${data.marginsMobile.top})` : '0',
          '--marginRight-m': data.marginsMobile?.right ? `calc(var(--spacing-col) * ${data.marginsMobile.right})` : '0',
          '--marginBottom-m': data.marginsMobile?.bottom ? `calc(var(--spacing-col) * ${data.marginsMobile.bottom})` : '0',
          '--width': data.width ? `calc(var(--spacing-col) * ${data.width})` : '100%',
        } as React.CSSProperties }
        data-speed={`clamp(${data.scrollSpeed})`}
        data-lag={`clamp(${data.scrollDelay})`}
      >
        <RichText content={data.richtext} />
      </div>
  ];
  if (data.breakAfter) {
    textBlockElements.push(
      <div key={`${i + data.__typename}-break`} className={styles.flexBreak}></div>
    );
  }
  return textBlockElements;
}