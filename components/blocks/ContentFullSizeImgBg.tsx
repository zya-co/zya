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
        <figure className={styles.backgroundImageWrapper}>        
          <Image
            src={props.data.bgImage?.image}
            alt={props.data.bgImage?.alt}
            fill={true}
            sizes="100vw"
            className={styles.backgroundImage}
          />
        </figure>
        {/* {JSON.stringify(props.data.content)} */}
        <div className={styles.content} data-tina-field={tinaField(props.data)}>
          <RichText content={props.data.content} />
          { props.data.button && (
            <Button href={props.data.button?.link} color={props.data.button?.color} className={styles.button}>
              <div data-tina-field={tinaField(props.data, 'button')}>
              {props.data.button?.label}
              </div>
            </Button>
          )}
        </div>
      </div>
    </DarkElement>
  )
}