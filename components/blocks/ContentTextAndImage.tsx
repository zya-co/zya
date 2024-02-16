import styles from './ContentTextAndImage.module.css'
import RichText from '../RichText'
import Image from 'next/image'
import { tinaField } from 'tinacms/dist/react'
import DarkElement from '../DarkElement'

export default function ContentTextAndImage(props) {
  const classNames = [
    styles.contentTextAndImage,
    props.data.bgColor === 'mineral-white' && styles.bg__mineralWhite,
    props.data.bgColor === 'earth-gray' && styles.bg__earthGray,
    props.data.bgColor === 'beatle' && styles.bg__beatle,
    props.data.variant === 'imageRightBorder' && styles.imageRightBorder,
    props.data.variant === 'imageRightWithGap' && styles.imageRightWithGap,
    props.data.variant === 'imageLeftBorder' && styles.imageLeftBorder,
  ].filter(Boolean).join(' ')

    if (props.data.bgColor === 'beatle' || props.data.bgColor === 'earth-gray') {
      return (
        <DarkElement>
          <div className={classNames}>
            <div className={styles.content} data-tina-field={tinaField(props.data, "content")}>
              <RichText content={props.data.content} />
            </div>
            { props.data.image && (
              <figure 
                className={styles.image} 
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
            <figure 
              className={styles.image} 
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
            )}
        </div>
      )
    }
}