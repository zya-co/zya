import styles from './HomeFounders.module.css'
import RichText from '../RichText'
import Image from 'next/image'
import Button from '../Button'
import { tinaField } from 'tinacms/dist/react'

export default function HomeFounders(props) {
  return (
    <div className={styles.homeFounders}>
      <div className={styles.intro}>
        <RichText content={props.data.intro} />
      </div>
      <h2 className={styles.quote}>{props.data.quote}</h2>
      <div className={styles.founders}>
        {props.data.founders.map((founder, index) => { 
          if (index < 2) {
            return (
              <div key={index} className={styles.founder}>
                <div className={styles.founderImage}>
                  <Image 
                    src={founder.image} 
                    alt={founder.name} 
                    sizes='(min-width: 640px) 45vw, 100vw'
                    fill={true}
                  />
                </div>
                <div className={styles.founderInfo}>
                  <h3 className={styles.founderInfo__name}>{founder.name}<sub>{founder.academicTitle}</sub></h3>
                  <h4 className={styles.founderInfo__jobTitle}>{founder.jobTitle}</h4>
                  <RichText content={founder.bio} />
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.signoff}>
        <div className={styles.signoff__text}>
          <RichText content={props.data.signoff.text} />
        </div>
        <Button href={props.data.signoff.button.link} color={props.data.signoff.button.color} className={styles.signoff__button}>
          {props.data.signoff.button.label}
        </Button>
      </div>
    </div>
  )
}