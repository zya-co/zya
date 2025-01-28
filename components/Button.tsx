import React from "react"
import styles from './Button.module.css'

export default function Button(props) {

  const classNames = [
    styles.button, 
    props.className && props.className, 
    props.variant === 'mini' && styles.button__mini,
    props.variant === 'arrowLeftMini' && styles.button__mini,
    props.variant === 'arrowRight' && styles.button__arrowRight,
    props.variant === 'arrowRightMini' && styles.button__arrowRightMini,
    props.color === 'fuchsia' && styles.button__fuchsia,
    props.color === 'lichen' && styles.button__lichen,
    props.color === 'morpho-teal' && styles.button__morphoTeal,
    props.color === 'mineral-white' && styles.button__mineralWhite,
  ].filter(Boolean)
  
  if (props.type === 'submit') {
    return (
      <button
        className={classNames.join(' ')}
        type='submit'
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