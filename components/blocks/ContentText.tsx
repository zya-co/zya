import styles from './ContentText.module.css';
import RichText from '../RichText';
import DarkElement from '../DarkElement';
import { TinaField } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';

export default function ContentText(props) {

  const classNames = [
    styles.contentText,
    props.data.bgColor === 'mineral-white' && styles.bg__mineralWhite,
    props.data.bgColor === 'morpho-teal' && styles.bg__morphoTeal,
    props.data.bgColor === 'beatle' && styles.bg__beatle,
    props.data.textColor === 'mineral-white' && styles.text__mineralWhite,
    props.data.textColor === 'morpho-teal' && styles.text__morphoTeal,
    props.data.textColor === 'fuchsia' && styles.text__fuchsia,
    props.data.textColor === 'beatle' && styles.text__beatle,
    props.data.variant === 'twoThirds' && styles.variant__twoThirds,
  ].filter(Boolean).join(' ')

  if ( props.data.bgColor === 'beatle' || props.data.bgColor === 'morpho-teal' ) {
    return (
      <DarkElement>
        <section className={classNames} data-tina-field={tinaField(props.data, 'content')}>
          <div className={styles.contentText__content}>
            <RichText content={props.data.content} />
          </div>
        </section>
      </DarkElement>
    )
  } 
  else {
    return (
      <section className={classNames} data-tina-field={tinaField(props.data, 'content')}>
        <div className={styles.contentText__content}>
          <RichText content={props.data.content} />
        </div>
      </section>
    )
  }
}