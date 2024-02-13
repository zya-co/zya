import React from "react"
import Image from "next/image"
import styles from './ContentFullSizeImgBg.module.css'
import RichText from "../RichText"
import Button from "../Button"
import DarkElement from "../DarkElement"

export default function ContentFullSizeImgBg(props) {
  return (
    <DarkElement>
      <div className={styles.contentFullSizeImgBg}>
        <Image
          src={props.data.bgImage.image}
          alt={props.data.bgImage.alt}
          fill={true}
          sizes="100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.content}>
          <RichText content={props.data.content} />
        </div>
        <Button href={props.data.button.link} color={props.data.button.color} className={styles.button}>
          {props.data.button.label}
        </Button>
      </div>
    </DarkElement>
  )
}