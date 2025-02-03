import { tinaField } from 'tinacms/dist/react';
import { useRef, useState } from 'react';
import styles from './TextWithPlus.module.css';

export default function TextWithPlus({ data }) {

  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsableTextWrapRef = useRef(null);
  const collapsableTextRef = useRef(null);
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
    if (collapsableTextWrapRef.current && collapsableTextRef.current ) {
      const wrapper = collapsableTextWrapRef.current as HTMLDivElement;
      const text = collapsableTextRef.current as HTMLParagraphElement;
      wrapper.style.height = isCollapsed ? `${text.scrollHeight}px` : '0px';
    }
  }
  const allClassNames = [styles.textWithPlus];
  if (data.plusPosition === 'afterInlineLeft') allClassNames.push(styles.afterInlineLeft);
  if (data.plusPosition === 'afterInlineRight') allClassNames.push(styles.afterInlineRight);

  return (
    <div 
      className={allClassNames.join(' ')}
      data-tina-field={tinaField(data)}
      style={{
        '--marginLeft-d': data.margins?.marginsDesktop?.left ? `calc(var(--spacing-col) * ${data.margins.marginsDesktop.left})` : '0',
        '--marginTop-d': data.margins?.marginsDesktop?.top ? `calc(var(--spacing-col) * ${data.margins.marginsDesktop.top})` : '0',
        '--marginRight-d': data.margins?.marginsDesktop?.right ? `calc(var(--spacing-col) * ${data.margins.marginsDesktop.right})` : '0',
        '--marginBottom-d': data.margins?.marginsDesktop?.bottom ? `calc(var(--spacing-col) * ${data.margins.marginsDesktop.bottom})` : '0',
        '--marginLeft-m': data.margins?.marginsMobile?.left ? `calc(var(--spacing-col) * ${data.margins.marginsMobile.left})` : '0',
        '--marginTop-m': data.margins?.marginsMobile?.top ? `calc(var(--spacing-col) * ${data.margins.marginsMobile.top})` : '0',
        '--marginRight-m': data.margins?.marginsMobile?.right ? `calc(var(--spacing-col) * ${data.margins.marginsMobile.right})` : '0',
        '--marginBottom-m': data.margins?.marginsMobile?.bottom ? `calc(var(--spacing-col) * ${data.margins.marginsMobile.bottom})` : '0',
        '--width': data.width ? `calc(var(--spacing-col) * ${data.width})` : '100%',
      } as React.CSSProperties }
    >
      <h2 className={styles.text}>
        {data.text}
        <div className={styles.toggleWrapper}>
          <button className={styles.toggle} onClick={toggleCollapsed}>
            {isCollapsed &&
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14.958V9.73707C7 8.75452 7.79651 7.95801 8.77906 7.95801H14" stroke="currentColor" strokeWidth="1.48255"/>
                <path d="M7 0.958058V6.17895C7 7.1615 6.20349 7.95801 5.22094 7.95801H-1.22522e-05" stroke="currentColor" strokeWidth="1.48255"/>
              </svg>
            }
            {!isCollapsed &&
              <svg width="14" height="15" viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.5234 1.94043H11.8037H-0.000347137" stroke="currentColor" strokeWidth="2.5"/>
              </svg>          
            }
          </button>
          <div className={styles.collapsableTextWrapper} ref={collapsableTextWrapRef}>
            <p className={styles.collapsableText} ref={collapsableTextRef}>{data.collapsableText}</p>
          </div>
        </div>
      </h2>
    </div>
  )
}