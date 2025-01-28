import { tinaField } from 'tinacms/dist/react'
import RichText from '../RichText'
import Button from '../Button';
import styles from './HomeFounders.module.css';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HomeFonders_Founder({founder, index}) {
  const [expanded, setExpanded] = useState(false);
  const [expandableContentHeight, setExpandableContentHeight] = useState(0);
  const expandableContentRef = useRef(null);
  
  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    if (expanded && expandableContentRef.current ) {
      const expandableContent = expandableContentRef.current as HTMLElement;
      setExpandableContentHeight(expandableContent.scrollHeight)
    } else {
      setExpandableContentHeight(0)
    }
  }, [expanded])

  return (
    <div key={index} className={styles.founder}>
      <div className={styles.founderImage} data-tina-field={tinaField(founder, 'image')}>
        <Image 
          src={founder.image} 
          alt={founder.name} 
          sizes='(min-width: 641px) 45vw, 90vw'
          fill={true}
        />
      </div>
      <div className={styles.founderInfo}>
        <h3 className={styles.founderInfo__name} data-tina-field={tinaField(founder, 'name')}>{founder.name}<sub data-tina-field={tinaField(founder, 'academicTitle')}>{founder.academicTitle}</sub></h3>
        <h4 className={styles.founderInfo__jobTitle} data-tina-field={tinaField(founder, 'jobTitle')}>{founder.jobTitle}</h4>
        <RichText content={founder.bio} />
      </div>
      {founder.expandableContent &&
        <div className={styles.expandableContent} data-tina-field={tinaField(founder, 'expandableContent')} data-expanded={expanded}>
          <div className={styles.expandableContent_text} ref={expandableContentRef} style={{height: expanded ? `${expandableContentHeight}px` : '0px'}}>
            <RichText content={founder.expandableContent?.content || ''} />
          </div>
          <div className={styles.expandableContent_buttons}>
            <button 
              className={!expanded ? styles.expandableContent_toggle : `${styles.expandableContent_toggle} ${styles.expandableContent_toggle__expanded}`}
              onClick={toggleExpand}
              >+</button>
              <span className={expanded ? `${styles.expandableContent_cta}` : `${styles.expandableContent_cta} ${styles.expandableContent_cta__hidden}`}>
                <Button color="lichen" href={founder.expandableContent?.cta?.link}>{founder.expandableContent?.cta?.label}</Button>
              </span>
          </div>
        </div>
      }
    </div>
  )
}