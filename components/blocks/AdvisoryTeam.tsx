import styles from './AdvisoryTeam.module.css'
import Image from 'next/image';
import Button from '../Button';
import DarkElement from '../DarkElement';

export default function AdvisoryTeam(props) {
  return (
    <DarkElement>
      <section className={styles.advisoryTeam}>
        <h1 className={styles.introHead}>{props.data.advisoryHead}</h1>
        <div className={styles.advisors}>
          {props.data.advisors?.map((advisor, index) => { 
            return (
              <div key={index} className={styles.advisor}>
                { advisor.image && (
                  <div className={styles.advisorImage}>
                    <Image
                      src={advisor.image}
                      alt={`Portrait of ${advisor.name}`}
                      sizes='(min-width: 641px) 45vw, 100vw'
                      fill={true}
                    />
                  </div>
                )}
                <div className={styles.advisorInfo}>
                  <h3 className={styles.advisorInfo__name}>{advisor.name}</h3>
                  <h4 className={styles.advisorInfo__title}>{advisor.title}</h4>
                  <p className={styles.advisorInfo__otherTitle}>{advisor.otherTitle}</p>
                </div>
                { advisor.button?.link && (
                  <Button href={advisor.button.link} className={styles.advisorButton} variant="mini" color="lichen">
                    { advisor.button.label || 'Connect' }
                  </Button>
                )}
              </div>
            );
            
          })}
        </div>
      </section>
    </DarkElement>
  )
}