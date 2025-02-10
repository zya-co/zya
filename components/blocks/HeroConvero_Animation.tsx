import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react/dist";

export default function HeroHomeAnimation(container) {

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  
  let tl = gsap.timeline({ 
    defaults: { duration: 1, ease: 'none' },
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=7000',
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
  }, 1.75)

  tl.to('.hero_introtext', {
    y: '-50vh',
    opacity: 0,
  }, 2.25)

  tl.fromTo('.hero_payofftext', {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
  }, 2.5)

  tl.from('.hero_payofftext_main, .hero_payofftext_sub', {
    yPercent: 100,
  }, 2.25)
}