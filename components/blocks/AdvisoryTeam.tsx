import styles from './AdvisoryTeam.module.css'
import { tinaField } from 'tinacms/dist/react';
import AdvisoryTeam_Advisor from './AdvisoryTeam_Advisor';
import DarkElement from '../DarkElement';

export default function AdvisoryTeam(props) {

  return (
    <DarkElement>
      <section className={styles.advisoryTeam}>
        <h2 className={styles.introHead} data-tina-field={tinaField(props.data, 'advisoryHead')}>{props.data.advisoryHead}</h2>
        <h3 className={styles.introSubhead}>{props.data.advisorySubhead}</h3>
        <div className={styles.advisors}>
          {props.data.advisors?.map((advisor, index) => { 
            return (
              <div key={index} className={styles.advisor} data-tina-field={tinaField(advisor)}>
                <AdvisoryTeam_Advisor advisor={advisor} />
              </div>
            );
            
          })}
        </div>
      </section>
    </DarkElement>
  )
}