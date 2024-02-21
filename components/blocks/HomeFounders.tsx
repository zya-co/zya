import styles from './HomeFounders.module.css'
import RichText from '../RichText'
import Image from 'next/image'
import Button from '../Button'
import { tinaField } from 'tinacms/dist/react'
import DarkElement from '../DarkElement'

export default function HomeFounders(props) {
  return (
    <DarkElement>
      <div className={styles.homeFounders}>
        <div className={styles.intro} data-tina-field={tinaField(props.data, 'intro')}>
          <RichText content={props.data.intro} />
        </div>
        <div className={styles.founders}>
          {props.data.founders.map((founder, index) => { 
            if (index < 2) {
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
                </div>
              );
            }
          })}
        </div>
        <h2 className={styles.quote} data-tina-field={tinaField(props.data, 'quote')}>{props.data.quote}</h2>
        <div className={styles.signoff} data-tina-field={tinaField(props.data, 'signoff')}>
          <div className={styles.signoff__text}>
            <RichText content={props.data.signoff.text} />
          </div>
          <Button href={props.data.signoff.button.link} color={props.data.signoff.button.color} className={styles.signoff__button}>
            {props.data.signoff.button.label}
          </Button>
        </div>
      </div>
    </DarkElement>
  )
}