import styles from './HeroConvero.module.css';
import HeroConvero_Enzymes from './HeroConvero_Enzymes';
import DarkElement from '../DarkElement';
import { useRef } from 'react';
import { useGSAP } from "@gsap/react/dist";
import HeroConvero_Animation from './HeroConvero_Animation';

export default function HeroConvero(props) {
  const gsapRef = useRef(null);

    useGSAP(() => {
      if (gsapRef.current) {
        HeroConvero_Animation(gsapRef.current);
      }
    }, {scope: gsapRef});

  return (
    <>
      <div className={`hero ${styles.hero}`} ref={gsapRef}>
        <h4 className={`hero_introtext ${styles.hero_introtext}`}>The future of sugar reduction...</h4>
        <HeroConvero_Enzymes />
          <div className={`hero_payofftext ${styles.hero_payofftext}`}>
            <h1 className={`hero_payofftext_main ${styles.hero_payofftext_main}`}>...is conversion</h1>
            <h4 className={`hero_payofftext_sub ${styles.hero_payofftext_sub}`}>Introducing a groundbreaking approach to nutrition through enzymatic innovation: Convero.</h4>
          </div>
      </div>
      <DarkElement>
        <div style={{
          'position': 'relative',
          'marginTop': '-150vh',
          'marginBottom': '-1px',
          'height': '150vh',
          'width': '100%',
          'opacity': '1' 
        }}>
        </div>
      </DarkElement>
    </>
  )
}

export const heroConveroBlockSchema = {
  name: 'heroConvero',
  label: 'Hero Convero',
  type: 'object',
  fields: [
    {
      name: 'headline',
      label: 'Headline',
      type: 'string',
    },
  ]
}