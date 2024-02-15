import React from "react"
import styles from './Button.module.css'

export default function Button(props) {

  const classNames = [
    styles.button, 
    props.className && props.className, 
    props.variant === 'mini' && styles.button__mini,
    props.color === 'fuchsia' && styles.button__fuchsia,
    props.color === 'lichen' && styles.button__lichen,
    props.color === 'morpho-teal' && styles.button__morphoTeal
  ].filter(Boolean)
  
  if (props.type === 'submit') {
    return (
      <button
        className={classNames.join(' ')}
      >
        {props.text}
      </button>
    )
  } else {
    return (
      <a 
        href={props.href} 
        className={classNames.join(' ')}
      >
        {props.children}
      </a>
    )
  }
  
}