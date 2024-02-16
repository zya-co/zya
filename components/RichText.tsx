import React from "react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import Button from "./Button"
import Image from "next/image"
import styles from './RichText.module.css'

export default function RichText(props) {

  const Cta = (props) => {
    return (
      <Button href={props.link} color={props.color}>
        {props.label}
      </Button>
    )
  }
  const enzyme = (props) => {
    return (
      <div className={styles.enzyme}>
        <Image 
          src={props.image} 
          alt={props.alt}
          fill={true}
        />
      </div>
    )
  }
  const spacer = (props) => {
    const classNames = [
      styles.spacer,
      props.height === 'small' && styles.spacerSmall,
      props.height === 'medium' && styles.spacerMedium,
      props.height === 'large' && styles.spacerLarge,
    ].filter(Boolean).join(' ')

    return (
      <div className={classNames}></div>
    )
  }

  return (
    <>
      <TinaMarkdown 
        content={props.content} 
        components={
          {Cta, enzyme, spacer}
        }
      />
    </>
  )
}