import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function HeroHomeAnimation(container) {

  gsap.registerPlugin(ScrollTrigger);
  
  useGSAP(() => {

    const vpHeight = () => {
      return window.innerHeight;
    }
    

      let tl = gsap.timeline({ 
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=2000',
          scrub: true,
          pin: true,
          // markers: true,
        },
      });

      tl.set('.enzyem1, .enzyme2, .enzyme3, .enzyme4',  {})

      tl.to('.enzyme1, .enzyme2, .enzyme3', {
        y: -0.95 * vpHeight(),
        rotateZ: 86,
        stagger: 0.5,
        duration: 1,
      }, 0)

      
      tl.to('.enzyme1, .enzyme2, .enzyme3', {
        y: -2 * vpHeight(),
        duration: 1,
      }, 2)
      
      
      tl.to('.enzyme4', {
        y: -2 * vpHeight(),
        rotateZ: 120,
        duration: 1,
      }, 1.75)
      
      tl.to('.enzyme4', {
        scale: 6,
        duration: 1,
      }, 2.75)
      
      tl.to('.hero_introtext', {
        y: '-50vh',
        opacity: 0,
        duration: 1,
      }, 3)

      tl.to('.hero_payofftext', {
        yPercent: -100,
        autoAlpha: 1,
        duration: 1,
      }, 3)

  }, {scope: container, dependencies: [container]});
}