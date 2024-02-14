import styles from './ContentTextAndImage.module.css'
import RichText from '../RichText'
import Image from 'next/image'
import { tinaField } from 'tinacms/dist/react'

export default function ContentTextAndImage(props) {
  let classNames = styles.contentTextAndImage
  if (props.data.bgColor === 'mineral-white') {
    classNames += ' ' + styles.bg__mineralWhite
  }
  if (props.data.bgColor === 'earth-gray') {
    classNames += ' ' + styles.bg__earthGray
  }

  if (props.data.variant === 'imageRightBorder') {
    classNames += ' ' + styles.imageRightBorder

    return (
      <div className={classNames}>
        <div className={styles.content} data-tina-field={tinaField(props.data, "content")}>
          <RichText content={props.data.content} />
        </div>
          <figure className={styles.image} data-tina-field={tinaField(props.data, "image")}>
            { props.data.image && (
              <Image 
                src={props.data.image.image}
                fill={true}
                sizes='(min-width: 640px) 45vw, 100vw'
                alt={props.data.image.alt}
              />
            )}
          </figure>
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}

      </div>
    )
  }
  else {
    return null
  }
}