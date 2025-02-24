import React from "react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import Button from "./Button"
import Image from "next/image"
import Link from "next/link"
import styles from './RichText.module.css'

export default function RichText(props) {

  const Cta = (props) => {
    return (
      <Button href={props.link} color={props.color} variant={props.variant}>
        {props.label}
      </Button>
    )
  }
  const enzyme = (props) => {
    return (
      <div className={`enzyme ${styles.enzyme} ${props.alignment === 'center' && styles.enzymeCenterAligned} ${props.alignment === 'right' && styles.enzymeRightAligned}`}>
        <Image 
          src={props.image} 
          alt={props.alt}
          fill={true}
        />
      </div>
    )
  }
  const customImage = (props) => {

    const sizesDesktop = props.widthDesktop ? `${props.widthDesktop * 6 }vw` : '100vw'
    const sizesMobile = props.widthMobile ? `${props.widthMobile * 11.25 }vw` : '100vw'

    return (
      <figure 
        className={`customImage ${styles.customImage} ${props.alignment === 'center' && styles.customImageCenterAligned} ${props.alignment === 'right' && styles.customImageRightAligned}`}
        style={{
          '--width-d': props.widthDesktop ? `calc(var(--spacing-col) * ${props.widthDesktop})` : '100%',
          '--width-m': props.widthMobile ? `calc(var(--spacing-col) * ${props.widthMobile})` : '100%',
          '--height-d': props.heightDesktop ? `calc(var(--spacing-col) * ${props.heightDesktop})` : 'auto',
          '--height-m': props.heightMobile ? `calc(var(--spacing-col) * ${props.heightMobile})` : 'auto',
          marginTop: props.marginTop ? `calc(var(--spacing-col) * ${props.marginTop})` : 'calc(var(--spacing-col) * 0.5)',
          marginBottom: props.marginBottom ? `calc(var(--spacing-col) * ${props.marginBottom})` : 'calc(var(--spacing-col) * 0.5)',
        } as React.CSSProperties }
      >
        {props.image && 
          <Image 
            src={props.image} 
            alt={props.alt || 'Sorry no alt text provided'}
            width={1000}
            height={props.aspectRatio ? Math.round(1000 / props.aspectRatio) : 1000}
            sizes={`(min-width: 641px) ${sizesDesktop}, ${sizesMobile}`}
          />
        }
        {props.caption &&
          <figcaption className={styles.customImage_caption}>{props.caption}</figcaption>
        }
      </figure>
    )
  }

  const spacer = (props) => {
    const classNames = [
      styles.spacer,
      props.height === 'small' && styles.spacerSmall,
      props.height === 'medium' && styles.spacerMedium,
      props.height === 'large' && styles.spacerLarge,
    ].filter(Boolean).join(' ')
    
    const colsHeightStyles = {
      '--height-m': props.colHeightMobile > 0 ? `calc(var(--spacing-col) * ${props.colHeightMobile})` : '0',
      '--height-d': props.colHeightDesktop > 0 ? `calc(var(--spacing-col) * ${props.colHeightDesktop})` : '0',
      '--marginBottom-m': props.colHeightMobile && props.negativeSpaceMobile ? `calc(var(--spacing-col) * ${props.colHeightMobile} * -2)` : '0',
      '--marginBottom-d': props.colHeightDesktop && props.negativeSpaceDesktop ? `calc(var(--spacing-col) * ${props.colHeightDesktop} * -2)` : '0',
    } as React.CSSProperties

    return (
      <div className={classNames} style={colsHeightStyles}></div>
    )
  }

  const inlineFormat = (props) => {
    return (
      <span
        className={styles.inlineFormat}
        style={{
          color: props.color ? 'var(--color-'+props.color+')' : 'inherit',
          textDecoration: props.underlined ? 'underline' : 'none',
        }}
      >
        {props.text}
      </span>
    )
  }

  return (
    <>
      <TinaMarkdown 
        content={props.content} 
        components={
          {
            Cta, 
            enzyme, 
            spacer, 
            customImage, 
            inlineFormat,
            a: (props) => <Link scroll={false} href={props?.url || '#'} {...props} />,
          }
        }
      />
    </>
  )
}
