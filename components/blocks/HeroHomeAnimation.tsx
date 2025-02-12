import { gsap } from "gsap/dist/gsap";
// import { useGSAP } from "@gsap/react/dist";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function heroHomeAnimation(container) {

  gsap.registerPlugin(ScrollTrigger);

  // setTimeout(() => {
    let isMobile = window.innerWidth < 641;

    const parent = container as HTMLElement;
    let fullHeight = parent?.getBoundingClientRect().height || 0;
    const h1coords = container.querySelector('.headline1')?.getBoundingClientRect() || {top: 0, height: 0};
    const shape1rect = container.querySelector('.shape1')?.getBoundingClientRect() || {height: 0};
    const shape2rect = container.querySelector('.shape2')?.getBoundingClientRect() || {height: 0};
    const shape3rect = container.querySelector('.shape3')?.getBoundingClientRect() || {height: 0};
    const contentRect = container.querySelector('.heroContentWrapper')?.getBoundingClientRect() || {height: 0};
    const windowContentDiff = window.innerHeight - contentRect.height;
    const shapeBetween = shape2rect.height * 0.9;
    
    parent.style.height = `${window.innerHeight - windowContentDiff }px`;

    gsap.set('.heroHomeInside', { autoAlpha: 1, overflow: 'hidden'})
    gsap.set('.heroSubhead, .shape', { position: 'fixed', y: '100vh' } )
    gsap.set('.heroContentWrapper', { position: 'absolute', bottom: '0' } )
    gsap.set('.headline1', { 
      display: 'block',
       position: 'fixed',
      autoAlpha: 1, 
      y: isMobile ? `${window.innerHeight/2 - h1coords.height - 10 }` : `${window.innerHeight/2 - h1coords.height/1.5}`, 
      zIndex: 3, 
      mixBlendMode: 'difference'
    });
    gsap.set('.heroSubhead', { 
      y: isMobile ? `${window.innerHeight/2  + 10}` : `${window.innerHeight/2 + h1coords.height/2}`}
    )
    gsap.set('.shape', { zIndex: 2 });
    gsap.set('.shape1', { position: 'fixed', top: `${0.2 * window.innerHeight}`, y: `${0.75 * window.innerHeight}`})
    gsap.set('.shape2', { position: 'fixed', top: `${0.2 * window.innerHeight + shapeBetween + shape1rect.height}`, y: `${0.75 * window.innerHeight}`})
    gsap.set('.shape3', { position: 'fixed', top: `${0.2 * window.innerHeight + 2 * shapeBetween + shape1rect.height + shape2rect.height}`, y: `${0.75 * window.innerHeight}`})
    gsap.set('.shape4', { position: 'fixed', top: `${0.2 * window.innerHeight + 3 * shapeBetween + shape1rect.height + shape2rect.height + shape3rect.height}`, y: `${0.75 * window.innerHeight}`})
    gsap.set('.heroContent1, .heroContent2', { autoAlpha: 0, yPercent: 10 });
    gsap.set('.scrollIndicator', { position: 'fixed', y: '85svh', left: 'var(--spacing-s)'})
    
    const els = {};
    const elsArray = document.querySelectorAll('.headline1, .headline2, .heroSubhead, .shape1, .shape2, .shape3, .shape4');
    elsArray.forEach((element) => {
      els[element.classList[0]] = element.getBoundingClientRect();
    });

    const tl = gsap.timeline({ 
      scrollTrigger: {
        trigger: parent,
        start: 'top top',
        end: `+=${1.25 * fullHeight}px`,
        // end: 'bottom top',
        pin: true,
        scrub: true,
        // markers: true,
      },
      defaults: { ease: 'none' }
    });

    tl.addLabel('start');
    
    tl.to('.heroSubhead, .scrollIndicator', {
      yPercent: -50,
      duration: .5,
      autoAlpha: 0,
    })
    
    tl.addLabel('subHead');

    tl.to('.shape1', {
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, 'start')
    
    tl.addLabel('shape1');

    tl.to('.shape2', {
      y: 0,
      duration: .75,
      rotate: 45,
      ease: 'power2.out',
    }, 'shape1-=.5')

    tl.addLabel('shape2');
    
    tl.to('.shape3, .shape4', {
      y: 0,
      duration: .75,
      ease: 'none',
      rotate: 45,
    }, 'shape2-=.25')

    tl.addLabel('shape3');
    
    tl.to('.shape1, .shape2, .shape3, .shape4, .headline1, .headline2', {
      y: isMobile ? '-=80vh' : '-=120vh',
      duration: 1,
      ease: 'power2.out',
    }, 'shape3')
    tl.to('.shape1, .shape2, .shape3, .headline1, .headline2', {
      y: isMobile ? '-=40vh' : '-=0vh',
      duration: .5,
      ease: 'power2.out',
    }, 'shape3+=.5')
    tl.to('.shape4', {
      scale: isMobile ? 6 : 3.5,
      rotate: -30,
      ease: 'power2.in',
      duration: .25,
    }, 'shape3+=.25')
    tl.to('.heroContentWrapper', {
      zIndex: 5,
      duration: 1,
    }, 'shape3' )
    tl.set('.heroHomeInside', {
      backgroundColor: 'var(--color-morpho-teal)',
      height: '100%',
      width: '100%',
    }, 'shape3+=.5')
    tl.set('.heroContentWrapper', {
      yPercent: 0,
      backgroundColor: 'var(--color-morpho-teal)',
    })
    tl.to('.heroContent1, .heroContent2', {
      autoAlpha: 1,
      yPercent: 0,
      ease: 'power4.out',
      stagger: 0.1,
      duration: .5,
    } , 'shape3+=.5')
    tl.set('.shape4', {
      display: 'none',
    })

    tl.addLabel('shape4');
    
    tl.addLabel('end');
    
  // }, 100);
}