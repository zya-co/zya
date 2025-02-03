import styles from './Comparison.module.css';
import { tinaField } from 'tinacms/dist/react';

export default function Comparison(props) {
  return (
    <section className={styles.comparison}>
      { props.data.items?.map((item, i) => {
        return (
          <div key={i} className={styles.comparisonItem} >
            <h3 data-tina-field={tinaField(item, 'title')}>{item.title}</h3>
            <ul className={styles.comparisonContentList}>
              {
                item.content?.map((content, i) => {
                  const classNames = [
                    styles.comparisonContentListItem,
                    content.value === 'yes' && styles.comparisonContentListItem__Yes,
                    content.value === 'no' && styles.comparisonContentListItem__No,
                  ].filter(Boolean).join(' ');
                  return (
                    <li key={i} className={classNames} data-tina-field={tinaField(content, 'label')}>
                      {content.label}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      })
      }
    </section>
  )
}