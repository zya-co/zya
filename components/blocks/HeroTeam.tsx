import styles from './HeroTeam.module.css';
import { tinaField } from 'tinacms/dist/react';
import Image from 'next/image';
import RichText from '../RichText';
import Button from '../Button';
import DarkElement from '../DarkElement';

export default function HeroTeam(props) {

  return (
    <DarkElement>
      <section className={styles.heroTeam}>
        <div className={styles.intro} data-tina-field={tinaField(props.data.introHead)}>
          <RichText content={props.data.introHead} />
          <div className={styles.inroHeadColumns}>
            <div className={styles.inroHeadColumn} data-tina-field={tinaField(props.data, 'introLeft')}>
              <RichText content={props.data.introLeft} />
            </div>
            <div className={styles.inroHeadColumn} data-tina-field={tinaField(props.data, 'introRight')}>
            <RichText content={props.data.introRight} />
            </div>
          </div>
        </div>
        <div className={styles.founders}>
          {props.data.founders.map((founder, index) => { 
            if (index < 2) {
              return (
                <div key={index} className={styles.founder}>
                  {
                    founder.image && (
                      <div className={styles.founderImage} data-tina-field={tinaField(founder, 'image')}>
                        <Image 
                          src={founder.image} 
                          alt={founder.name} 
                          sizes='(min-width: 641px) 45vw, 90vw'
                          fill={true}
                        />
                      </div>
                    )
                  }
                  <div className={styles.founderInfo}>
                    <h3 className={styles.founderInfo__name} data-tina-field={tinaField(founder, 'name')}>{founder.name}<sub data-tina-field={tinaField(founder, 'academicTitle')}>{founder.academicTitle}</sub></h3>
                    <h4 className={styles.founderInfo__jobTitle} data-tina-field={tinaField(founder, 'jobTitle')}>{founder.jobTitle}</h4>
                    <div className={styles.founderBio} data-tina-field={tinaField(founder, 'bio')}>
                      <RichText content={founder.bio} />
                    </div>
                  </div>
                  <div data-tina-field={tinaField(founder, 'button')}>
                    <Button
                      href={founder.button?.link}
                      color='fuchsia'
                      className={styles.founderButton}
                      variant="mini"
                    >{ founder.button?.label || 'Connect' }</Button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </section>
    </DarkElement>
  )
}