import styles from './HeroConvero.module.css';
import HeroConvero_Enzymes from './HeroConvero_Enzymes';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react/dist";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function HeroConvero(props) {

  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const gsapRef = useRef(null);

    useGSAP(() => {
      
      if(!gsapRef.current) return;
      
      const windowH = window.innerHeight;
  
      let tl = gsap.timeline({ 
        paused: true,
        defaults: { duration: 1, ease: 'none' },
        scrollTrigger: {
          trigger: gsapRef.current,
          start: 'top top',
          end: `+=${7 * windowH}`,
          scrub: true,
          pin: true,
          // markers: true,
        },
        onComplete: () => {
          document.querySelector('.indexNav--clone')?.classList.add('heroConveroAnimationComplete');
        }
      });

      tl.set('.enzyme1',  {
        y: '-15svh',
      })
      tl.set('.hero_payofftext', {
        yPercent: -100,
        autoAlpha: 0,
      })

      tl.to('.enzyme1, .enzyme2, .enzyme3, .enzyme4', {
        rotateZ: -20,
        y: '-95svh',
        stagger: 0.25,
      }, 0)

      tl.to('.enzymes', {
        yPercent: -50,
      }, 1.75)
      
      tl.to('.enzyme4', {
        rotateZ: -60,
        scale: 6,
      }, 2)

      tl.fromTo('.hero_introtext', {
        color: '#340E32',
      },{
        color: '#E681FF',
        onComplete: () => {
          document.querySelector('.mobileHeader')?.setAttribute('data-isLight', 'true');
          document.querySelector('.mainNav')?.setAttribute('data-isLight', 'true');
        },
        onReverseComplete: () => {
          document.querySelector('.mobileHeader')?.removeAttribute('data-isLight');
          document.querySelector('.mainNav')?.removeAttribute('data-isLight');
        },
      }, 1.25)

      tl.to('.hero_introtext', {
        y: '-100',
        opacity: 0,
        duration: 0.5
      }, 2.25)

      tl.fromTo('.hero_payofftext', {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        duration: 0.25
      }, 2.6)

      tl.from('.hero_payofftext_main, .hero_payofftext_sub', {
        y: 100,
      }, 2.6)


    }, {scope: gsapRef, dependencies: [gsapRef.current], revertOnUpdate: true});

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