import React from "react"
import styles from './Button.module.css'

export default function Button(props) {
  return (
    <a 
      href={props.href} 
      className={`${props.className} ${styles.button} 
                  ${props.color === 'fuchsia' ? styles.button__fuchsia : null}
                  ${props.color === 'lichen' ? styles.button__lichen : null}
                `}
    >
      {props.children}
    </a>
  )
}