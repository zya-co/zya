import styles from './ContentTextAndImage.module.css'
import RichText from '../RichText'
import Image from 'next/image'
import { tinaField } from 'tinacms/dist/react'

export default function ContentTextAndImage(props) {
  const classNames = [
    styles.contentTextAndImage,
    props.data.bgColor === 'mineral-white' && styles.bg__mineralWhite,
    props.data.bgColor === 'earth-gray' && styles.bg__earthGray,
    props.data.bgColor === 'beatle' && styles.bg__beatle,
    props.data.variant === 'imageRightBorder' && styles.imageRightBorder,
    props.data.variant === 'imageRightWithGap' && styles.imageRightWithGap,
  ].filter(Boolean).join(' ')

  if (props.data.variant === 'imageRightBorder' || props.data.variant === 'imageRightWithGap'){
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