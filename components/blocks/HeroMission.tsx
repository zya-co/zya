import styles from './HeroMission.module.css';
import RichText from '../RichText';
import { tinaField } from 'tinacms/dist/react';
import Image from 'next/image';

export default function HeroMission(props) {
  return (
    <>
      <section className={styles.heroMission}>
        <div className={styles.heroMission__headline} data-tina-field={tinaField(props.data, 'head')} data-speed="0.9">
          <RichText content={props.data.head} />
        </div>
        <div className={styles.heroMission__content}>
          {
            props.data.image && (
              <figure className={styles.heroMission__content__image} data-tina-field={tinaField(props.data, 'image')} data-speed="1.1">
                <Image 
                  src={props.data.image.src} 
                  alt={props.data.image.alt} 
                  fill={true} 
                />
              </figure>
            )
          }
          <div className={styles.heroMission__content__body} data-tina-field={tinaField(props.data, 'body')}>
            <RichText content={props.data.body} />
          </div>
        </div>
      </section>
    </>
  )
}