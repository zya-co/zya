import styles from './HeroApproach.module.css';
import RichText from '../RichText';
import { tinaField } from 'tinacms/dist/react';
import Image from 'next/image';
import DarkElement from '../DarkElement';

export default function HeroApproach(props) {
  return (
    <>
      <DarkElement>
        <section className={styles.heroApproach}>
          <div className={styles.heroApproach__headline} data-tina-field={tinaField(props.data, 'head')}>
            <RichText content={props.data.head} />
          </div>
          <div className={styles.heroApproach__content}>
            {
              props.data.image && (
                <figure className={styles.heroApproach__content__image} data-tina-field={tinaField(props.data, 'image')}>
                  <Image 
                    src={props.data.image.src} 
                    alt={props.data.image.alt} 
                    fill={true} 
                  />
                </figure>
              )
            }
            <div className={styles.heroApproach__content__body} data-tina-field={tinaField(props.data, 'body')}>
              <RichText content={props.data.body} />
            </div>
          </div>
        </section>
      </DarkElement>
    </>
  )
}