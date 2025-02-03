import styles from './AdvisoryTeam.module.css';
import Image from 'next/image';
import Button from '../Button';
import { useState, useRef, useEffect, use } from 'react';

export default function AdvisoryTeam({advisor}) {
  const bioRef = useRef(null);
  const button = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }

  useEffect(() => {

    if (bioRef.current && button.current) {
      const bio = bioRef.current as HTMLDivElement;
      const thebutton = button.current as HTMLButtonElement;
      const text = bio.querySelector('.advisorInfo__bio__content__text') as HTMLParagraphElement;

      if (!isCollapsed) {
        bio.style.height = bio.scrollHeight + 'px';
        bio.style.width = text.getBoundingClientRect().width + 'px';
      } else {
        bio.style.height = thebutton.getBoundingClientRect().height + 'px';
        bio.style.width = thebutton.getBoundingClientRect().width + 'px';
      }

      const handleClickOutside = (event: MouseEvent) => {
        if (bio && button.current && !bio.contains(event.target as Node) && !thebutton.contains(event.target as Node)) {
        setIsCollapsed(true);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }


  }, [isCollapsed]);

  return (
    <>
    {/* <pre>{JSON.stringify(advisor, null, 2)}</pre> */}
    { advisor.image && (
      <div className={styles.advisorImage}>
        <Image
          src={advisor.image}
          alt={`Portrait of ${advisor.name}`}
          sizes='(min-width: 641px) 17vw, 33vw'
          fill={true}
        />
      </div>
    )}
    <div className={styles.advisorInfo}>
      <h3 className={styles.advisorInfo__name}>{advisor.name}</h3>
      <h4 className={styles.advisorInfo__title}>{advisor.title}</h4>
      <p className={styles.advisorInfo__otherTitle}>{advisor.otherTitle}</p>
      <div className={styles.advisorInfo__contact}>
        { advisor.bio !=  '' && 
          <div className={styles.advisorInfo__bio}>
            <button ref={button} className={isCollapsed ? `${styles.advisorInfo__bio__toggle}` : `${styles.advisorInfo__bio__toggle} ${styles.advisorInfo__bio__toggle__open}`} onClick={toggleCollapsed}>
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
            <div className={styles.advisorInfo__bio__content} ref={bioRef}>
              <p className={`advisorInfo__bio__content__text ${styles.advisorInfo__bio__content__text}`}>
                {advisor.bio}
              </p>
            </div>
          </div>
        }
        { advisor.button?.link && (
          <Button href={advisor.button.link} className={styles.advisorButton} variant="arrowRightMini" color="lichen">
            { advisor.button.label || 'Connect' }
          </Button>
        )}
      </div>
    </div>
    </>
  )
}