import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function HeroHomeAnimation(container) {

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    
    let fullHeight = document.querySelector('.heroHome')?.getBoundingClientRect().height;
   
    const parent = document.querySelector('.heroHome') as HTMLElement;
    parent.style.height = `${fullHeight}px`;

    gsap.set('.headline1, .headline2, .heroSubhead, .shape, .heroContentWrapper', { position: 'fixed', y: '100vh' } )
    gsap.set('.heroSubhead', { y: '70vh'})
    gsap.set('.shape1', { y: '90vh'})
    gsap.set('.headline1', { display: 'block', autoAlpha: 1, y: '30vh', zIndex: 2, mixBlendMode: 'difference'});
    gsap.set('.headline2', { display: 'block', autoAlpha: 1, y: '30vh', zIndex: 3, mixBlendMode: 'hue' });
    gsap.set('.heroContent1, .heroContent2', { zIndex: 4, autoAlpha: 0, yPercent: 10 });
    gsap.set('.shape', { zIndex: 1 });
    
    const els = {};
    const elsArray = document.querySelectorAll('.headline1, .headline2, .heroSubhead, .shape1, .shape2, .shape3, .shape4');
    elsArray.forEach((element) => {
      els[element.classList[0]] = element.getBoundingClientRect();
    });

    const tl = gsap.timeline({ 
      scrollTrigger: {
        trigger: '.heroHome',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        // markers: true,
      }
    });

    tl.addLabel('start');
    
    tl.to('.heroSubhead', {
      y: els['headline1'].top + ( 0.5 * els['headline1'].height ) + 'px',
      duration: 1,
      autoAlpha: 0,
    })
    
    tl.addLabel('subHead');

    tl.to('.shape1', {
      y: els['headline1'].top - ( 1.5 * els['shape1'].height )  + 'px',
      duration: 1,
      ease: 'power2.out',
    }, 'start')
    
    tl.addLabel('shape1');

    tl.to('.shape2', {
      y: els['headline1'].top + els['headline1'].height / 4 + 'px',
      duration: .75,
      rotate: 45,
      ease: 'power2.out',
    }, 'shape1-=.5')

    tl.addLabel('shape2');
    
    tl.to('.shape3', {
      y: els['headline1'].bottom - 0.18 * els['headline1'].height + 'px',
      duration: .75,
      rotate: 45,
      ease: 'power2.out',
    }, 'shape2-=.25')

    tl.addLabel('shape3');
    
    tl.to('.headline1, .headline2', {
      y: '-=80vh',
      duration: 1,
      ease: 'power2.out',
    }, 'shape3')
    tl.to('.shape1, .shape2, .shape3', {
      y: '-=150vh',
      duration: 1,
      ease: 'power2.out',
    }, 'shape3')
    tl.to('.shape4', {
      y: 0.5 * ( window.innerHeight - els['shape4'].height ) + 'px',
      duration: 1
    }, 'shape3')
    tl.to('.heroContentWrapper', {
      y: '0',
      zIndex: 5,
      duration: 1,
    }, 'shape3' )
    tl.to('.shape4', {
      scale: 2.9,
      rotate: -30,
      ease: 'power2.in',
      duration: 1,
    })

    tl.addLabel('shape4');
    
    tl.to('.heroContent1, .heroContent2', {
      autoAlpha: 1,
      yPercent: 0,
      ease: 'power2.out',
      stagger: 0.1,
      duration: .75,
    })
  
  }, { scope: container }); // <-- scope is for selector text (optional)

}