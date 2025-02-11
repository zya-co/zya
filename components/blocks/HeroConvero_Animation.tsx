import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react/dist";

export default function HeroHomeAnimation(container) {

  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const windowH = window.innerHeight;
  
  let tl = gsap.timeline({ 
    defaults: { duration: 1, ease: 'none' },
    scrollTrigger: {
      trigger: container,
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
}