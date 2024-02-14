import styles from './ContentTextAndImage.module.css'

export default function ContentTextAndImage(props) {
  let classNames = styles.contentTextAndImage
  if (props.data.bgColor === 'mineral-white') {
    classNames += ' ' + styles.bg__mineralWhite
  }
  if (props.data.bgColor === 'earth-gray') {
    classNames += ' ' + styles.bg__earthGray
  }

  return (
    <div className={classNames} >
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}