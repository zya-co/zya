import styles from './AdvisoryTeam.module.css'
import { tinaField } from 'tinacms/dist/react';
import AdvisoryTeam_Advisor from './AdvisoryTeam_Advisor';
import DarkElement from '../DarkElement';

const darkBackgrounds = ['morpho-teal', 'earth-gray', 'beatle'];
const darkHighlights = ['morpho-teal', 'earth-gray', 'beatle'];

export default function AdvisoryTeam(props) {
  const bgColor = props.data.bgColor || 'earth-gray';
  const highlightColor = props.data.highlightColor || 'lichen';
  const advisorImageCircleFrame = props.data.advisorImageCircleFrame !== false;
  const isDarkBg = darkBackgrounds.includes(bgColor);
  const textColor = isDarkBg ? 'mineral-white' : 'morpho-teal';
  const highlightTextColor = darkHighlights.includes(highlightColor) ? 'mineral-white' : 'morpho-teal';

  const sectionStyle = {
    backgroundColor: `var(--color-${bgColor})`,
    color: `var(--color-${textColor})`,
    '--highlight-color': `var(--color-${highlightColor})`,
    '--highlight-text-color': `var(--color-${highlightTextColor})`,
  };

  const section = (
    <section className={styles.advisoryTeam} style={sectionStyle} data-tina-field={tinaField(props.data)}>
      <h2 className={styles.introHead} data-tina-field={tinaField(props.data, 'advisoryHead')}>{props.data.advisoryHead}</h2>
      <h3 className={styles.introSubhead} data-tina-field={tinaField(props.data, 'advisorySubhead')}>{props.data.advisorySubhead}</h3>
      <div className={styles.advisors}>
        {props.data.advisors?.map((advisor, index) => (
          <div key={index} className={styles.advisor} data-tina-field={tinaField(advisor)}>
            <AdvisoryTeam_Advisor
              advisor={advisor}
              advisorImageCircleFrame={advisorImageCircleFrame}
            />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <DarkElement ignore={!isDarkBg}>
      {section}
    </DarkElement>
  );
}