import React from "react"
import Image from "next/image"
import styles from './ContentFullSizeImgBg.module.css'
import { tinaField } from "tinacms/dist/react"
import RichText from "../RichText"
import Button from "../Button"
import DarkElement from "../DarkElement"

export default function ContentFullSizeImgBg(props) {
  return (
    <DarkElement>
      <div className={styles.contentFullSizeImgBg}>
        <figure data-tina-field={tinaField(props.data, 'bgImage')} className={styles.backgroundImageWrapper}>
          <Image
            src={props.data.bgImage.image}
            alt={props.data.bgImage.alt}
            fill={true}
            sizes="100vw"
            className={styles.backgroundImage}
          />
        </figure>
        <div className={styles.content} data-tina-field={tinaField(props.data, 'content')}>
          <RichText content={props.data.content} />
        </div>
        <Button href={props.data.button.link} color={props.data.button.color} className={styles.button} data-tina-field={tinaField(props.data, 'button')}>
          {props.data.button.label}
        </Button>
      </div>
    </DarkElement>
  )
}