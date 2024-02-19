import styles from './AdvisoryTeam.module.css'
import Image from 'next/image';
import Button from '../Button';
import DarkElement from '../DarkElement';
import { tinaField } from 'tinacms/dist/react';

export default function AdvisoryTeam(props) {
  return (
    <DarkElement>
      <section className={styles.advisoryTeam}>
        <h1 className={styles.introHead} data-tina-field={tinaField(props.data, 'advisoryHead')}>{props.data.advisoryHead}</h1>
        <div className={styles.advisors}>
          {props.data.advisors?.map((advisor, index) => { 
            return (
              <div key={index} className={styles.advisor} data-tina-field={tinaField(advisor)}>
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
                  { advisor.button?.link && (
                    <Button href={advisor.button.link} className={styles.advisorButton} variant="mini" color="lichen">
                      { advisor.button.label || 'Connect' }
                    </Button>
                  )}
                </div>
              </div>
            );
            
          })}
        </div>
      </section>
    </DarkElement>
  )
}