import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function NavigationHover(container){

  
  useGSAP(() => {
    
    // add circles and style them with gsap
    const circleGroup = document.createElement('div');
    circleGroup.classList.add('mainNavHoverCircleGroup');
    document.querySelector('.mainNav')?.appendChild(circleGroup);

    for (let i = 0; i < 6; i++ ) {
      const circle = document.createElement('div');
      circle.classList.add('mainNavHoverCircle');
      document.querySelector('.mainNavHoverCircleGroup')?.appendChild(circle);
    }

    const circWidthVw = 2.3
    const circdist = 45
    const maxgroupWidth = circWidthVw + circWidthVw * circdist * 2 / 100
    const navBarHeight = document.querySelector('.mainNav')?.getBoundingClientRect().height || 0

    gsap.set('.mainNavHoverCircleGroup', {
      position: 'absolute',
      left: '50vw',
      top: `${0.5 * navBarHeight}px`,
      autoAlpha: 0,
      width: `${maxgroupWidth}vw`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
      zIndex: -1
    })
    const circleGroupCoords = document.querySelector('.mainNavHoverCircleGroup')?.getBoundingClientRect() || {x: 0, y: 0, height: 0, width: 0};
    gsap.set('.mainNavHoverCircle', {
      backgroundColor: 'var(--color-fuchsia)',
      width: `${circWidthVw}vw`, 
      height: `${circWidthVw}vw`,
      borderRadius: '50%',
      position: 'absolute',
    })

    const tlMorph = gsap.timeline({paused: true, defaults: { ease: 'none'}})
    
    tlMorph.addLabel('null')
    
    tlMorph.to('.mainNavHoverCircle:nth-child(even)', {
      transformOrigin: `${50 + circdist}% 50%`,
      xPercent: -circdist,
      duration: 1
    })
    tlMorph.to('.mainNavHoverCircle:nth-child(odd)', {
      transformOrigin: `${50 - circdist}% 50%`,
      xPercent: circdist,
      duration: 1
    }, 'null')
    tlMorph.addLabel('two')

    tlMorph.to('.mainNavHoverCircle:nth-child(1)', {
      rotate: -90,
      duration: 1,
    }, 'two')
    tlMorph.to('.mainNavHoverCircle:nth-child(2)', {
      
      rotate: -90,
      duration: 1,
    }, 'two')
    tlMorph.addLabel('four')

    tlMorph.to('.mainNavHoverCircle:nth-child(1)', {
      rotate: -60,
      duration: 1
    }, 'four')
    tlMorph.to('.mainNavHoverCircle:nth-child(2)', {
      rotate: -60,
      duration: 1
    }, 'four')
    tlMorph.to('.mainNavHoverCircle:nth-child(3)', {
      rotate: 60,
      duration: 1
    }, 'four')
    tlMorph.to('.mainNavHoverCircle:nth-child(4)', {
      rotate: 60,
      duration: 1
    }, 'four')
    tlMorph.addLabel('six')


    //create an array of all .mainNav__linkList__link elements and for each create a hover eventlistener
    const links = document.querySelectorAll('.mainNav__linkList__link')

    links.forEach((link, i) => {
      link.addEventListener('mouseenter', (e) => {
        const linkRect = link.getBoundingClientRect()
        gsap.to('.mainNavHoverCircleGroup', {
          x: `${linkRect.x - circleGroupCoords.x + 0.5 * linkRect.width - 0.5 * circleGroupCoords.width}px`,
          duration: 0.5,
          autoAlpha: 1,
          ease: 'power2.out'
        })
        tlMorph.tweenTo(i === 0 ? 'two' : i === 1 ? 'four' : i === 2 ? 'six' : 'null', {
          duration: 0.5,
          ease: 'power2.out'
        })
      })
      link.addEventListener('mouseleave', (e) => {
        gsap.to('.mainNavHoverCircleGroup', {
          x : 0,
          autoAlpha: 0,
          duration: 0.5
        })
        tlMorph.tweenTo('null', {
          duration: 0.5
        })
      })
    })
    

  }, { scope: container })

}