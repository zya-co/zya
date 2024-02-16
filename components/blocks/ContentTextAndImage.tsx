import styles from './ContentTextAndImage.module.css'
import RichText from '../RichText'
import Image from 'next/image'
import { tinaField } from 'tinacms/dist/react'
import DarkElement from '../DarkElement'

export default function ContentTextAndImage(props) {

  
  const classNames = [
    styles.contentTextAndImage,
    props.data.bgColor === 'morpho-teal' && styles.bg__morphoTeal,
    props.data.bgColor === 'mineral-white' && styles.bg__mineralWhite,
    props.data.bgColor === 'earth-gray' && styles.bg__earthGray,
    props.data.bgColor === 'beatle' && styles.bg__beatle,
    props.data.variant === 'imageRightBorder' && styles.imageRightBorder,
    props.data.variant === 'imageRightWithGap' && styles.imageRightWithGap,
    props.data.variant === 'imageLeftBorder' && styles.imageLeftBorder,
    props.data.vAlignment === 'top' && styles.alignment__top,
    props.data.vAlignment === 'center' && styles.alignment__center,
    props.data.vAlignment === 'bottom' && styles.alignment__bottom,
  ].filter(Boolean).join(' ')

    if (props.data.bgColor === 'beatle' || props.data.bgColor === 'earth-gray') {
      return (
        <DarkElement>
          <div className={classNames}>
            <div className={styles.content} data-tina-field={tinaField(props.data, "content")}>
              <RichText content={props.data.content} />
            </div>
            { props.data.image && (
              <div className={styles.image}>
                <figure 
                  className={styles.imageShape} 
                  data-tina-field={tinaField(props.data, "image")}
                  style={{
                    'aspectRatio': props.data.image && props.data.image.aspectRatio || '1/1',
                  }}
                >
                    <Image 
                      src={props.data.image.image}
                      fill={true}
                      sizes='(min-width: 640px) 45vw, 100vw'
                      alt={props.data.image.alt}
                    />
                </figure>
              </div>
              )}
          </div>
        </DarkElement>
    )}
    else {
      return (
        <div className={classNames}>
          <div className={styles.content} data-tina-field={tinaField(props.data, "content")}>
            <RichText content={props.data.content} />
          </div>
          { props.data.image && (
          <div className={styles.image}>
            <figure 
              className={styles.imageShape} 
              data-tina-field={tinaField(props.data, "image")}
              style={{
                'aspectRatio': props.data.image && props.data.image.aspectRatio || '1/1',
              }}
            >
                <Image 
                  src={props.data.image.image}
                  fill={true}
                  sizes='(min-width: 640px) 45vw, 100vw'
                  alt={props.data.image.alt}
                />
            </figure>
          </div>
          )}
        </div>
      )
    }
}