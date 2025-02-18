import styles from './HomeFounders.module.css'
import RichText from '../RichText'
import { tinaField } from 'tinacms/dist/react'
import DarkElement from '../DarkElement'
import HomeFounders_Founder from './HomeFounders_Founder'

export default function HomeFounders(props) {

  return (
    <DarkElement>
      <div className={styles.homeFounders}>
        <div className={styles.intro} data-tina-field={tinaField(props.data, 'intro')}>
          <RichText content={props.data.intro} />
        </div>
        <h2 className={styles.quote} data-tina-field={tinaField(props.data, 'quote')}>{props.data.quote}</h2>
        <div className={styles.founders}>
          {props.data.founders.map((founder, index) => { 
            if (index < 2) {
              return (
                <HomeFounders_Founder key={index} founder={founder} index={index} />
              );
            }
          })}
        </div>
        {/* <div className={styles.signoff} data-tina-field={tinaField(props.data, 'signoff')}>
          <div className={styles.signoff__text}>
            <RichText content={props.data.signoff.text} />
          </div>
          <Button href={props.data.signoff.button.link} color={props.data.signoff.button.color} className={styles.signoff__button}>
            {props.data.signoff.button.label}
          </Button>
        </div> */}
      </div>
    </DarkElement>
  )
}