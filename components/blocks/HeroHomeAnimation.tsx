import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function HeroHomeAnimation(container) {

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    
    let isMobile = window.innerWidth < 641;

    const parent = document.querySelector('.heroHome') as HTMLElement;
    let fullHeight = parent?.getBoundingClientRect().height || 0;
    parent.style.height = `${fullHeight}px`;
    const h1coords = document.querySelector('.headline1')?.getBoundingClientRect() || {top: 0, height: 0};

    gsap.set('.heroHomeInside', { autoAlpha: 1, overflow: 'hidden'})
    gsap.set('.headline1, .headline2, .heroSubhead, .shape, .heroContentWrapper', { position: 'fixed', y: '100vh' } )
    gsap.set('.heroContentWrapper', { y: '0' } )
    gsap.set('.headline1', { display: 'block', autoAlpha: 1, y: `${window.innerHeight/2 - h1coords.height/1.5}`, mixBlendMode: 'difference'});
    gsap.set('.headline2', { display: 'block', autoAlpha: 1, y: `${window.innerHeight/2 - h1coords.height/1.5}`, mixBlendMode: 'hue' });
    gsap.set('.heroSubhead', { y: `${window.innerHeight/2 + h1coords.height/2}`})
    gsap.set('.shape', { zIndex: 1 });
    gsap.set('.shape1', { y: '90vh'})
    gsap.set('.heroContent1, .heroContent2', { zIndex: 4, autoAlpha: 0, yPercent: 100 });
    
    const els = {};
    const elsArray = document.querySelectorAll('.headline1, .headline2, .heroSubhead, .shape1, .shape2, .shape3, .shape4');
    elsArray.forEach((element) => {
      els[element.classList[0]] = element.getBoundingClientRect();
    });

    const tl = gsap.timeline({ 
      scrollTrigger: {
        trigger: parent,
        start: 'top top',
        // end: `+=${fullHeight + 0.25 * window.innerHeight}px`,
        end: 'bottom top',
        scrub: true,
        // markers: true,
      },
      defaults: { ease: 'none' }
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
    tl.to('.heroContentWrapper', {
      y: '0',
      zIndex: 5,
      duration: 1,
    }, 'shape3' )
    tl.to('.shape4', {
      y: 0.5 * ( window.innerHeight - els['shape4'].height ) + 'px',
      scale: 2.8,
      rotate: -30,
      ease: 'power2.in',
      duration: 1,
    }, 'shape3-=.25')
    tl.to('.heroHome', {
      backgroundColor: 'var(--color-morpho-teal)',
      duration: .5
    }, 'shape3+=.25')
    tl.set('.heroHomeInside', {
      backgroundColor: 'var(--color-morpho-teal)',
      height: '100%',
      width: '100%',
      onComplete: () => {
        gsap.to('.heroContent1, .heroContent2', {
          autoAlpha: 1,
          yPercent: 0,
          ease: 'power2.out',
          stagger: 0.1,
          duration: .5,
        })
      },
      onReverseComplete: () => {
        gsap.to('.heroContent1, .heroContent2', {
          autoAlpha: 0,
          yPercent: 100,
          ease: 'power2.out',
          duration: .5,
        })
      }
    }, 'shape3+=0.75')
    tl.set('.heroContentWrapper', {
      backgroundColor: 'var(--color-morpho-teal)',
    })
    tl.set('.shape4', {
      display: 'none',
    })

    tl.addLabel('shape4');
    
    // tl.to('.heroContent1, .heroContent2', {
    //   autoAlpha: 1,
    //   yPercent: 0,
    //   ease: 'power2.out',
    //   stagger: 0.1,
    //   duration: .5,
    // }, 'shape4-=.25')

    // tl.addLabel('content');

    tl.to('.heroContentWrapper', {
      yPercent: -100,
      duration: 1,
      ease: 'none',
    }, 'shape4')

    tl.addLabel('end');
  
  }, { scope: container }); // <-- scope is for selector text (optional)

}