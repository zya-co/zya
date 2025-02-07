import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function NavigationHover(container){

  useGSAP(() => {
    
    function handleResize() {
      gsap.set('.mainNavHoverCircleGroup', {
        position: 'absolute',
        left: circleGroupCoords().x,
        top: circleGroupCoords().y,
        autoAlpha: 0,
        width: circleGroupCoords().width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: -1
      })
    }
    
    window.addEventListener('resize', handleResize)

    // add circles and style them with gsap
    const circleGroup = document.createElement('div');
    circleGroup.classList.add('mainNavHoverCircleGroup');
    document.querySelector('.mainNav')?.appendChild(circleGroup);

    for (let i = 0; i < 7; i++ ) {
      const circle = document.createElement('div');
      circle.classList.add('mainNavHoverCircle');
      document.querySelector('.mainNavHoverCircleGroup')?.appendChild(circle);
    }

    const circWidthVw = 2.3
    const circdist = 45
    const maxgroupWidth = circWidthVw + circWidthVw * circdist * 2 / 100
    const navBarHeight = () => { return document.querySelector('.mainNav')?.getBoundingClientRect().height || 0 }

    const circleGroupCoords = () => { 
      let coords = {
        x: window.innerWidth/2, 
        y: `${0.5 * navBarHeight()}`, 
        height: 0, 
        width: (maxgroupWidth/100*window.innerWidth)
      };
      return coords;
    };

    gsap.set('.mainNavHoverCircleGroup', {
      position: 'absolute',
      left: circleGroupCoords().x,
      top: circleGroupCoords().y,
      autoAlpha: 0,
      width: circleGroupCoords().width,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
      zIndex: -1
    })

    gsap.set('.mainNavHoverCircle', {
      backgroundColor: 'var(--color-fuchsia)',
      width: `${circWidthVw}vw`, 
      height: `${circWidthVw}vw`,
      borderRadius: '50%',
      position: 'absolute',
    })

    const tlMorph = gsap.timeline({paused: true, defaults: { ease: 'none'}})
    
    tlMorph.addLabel('null')
    
    tlMorph.to('.mainNavHoverCircleGroup', {
      rotate: 45,
      y: `${0.125 * navBarHeight()}`,
      duration: 1
    }, 'null')
    tlMorph.to('.mainNavHoverCircle:nth-child(1)', {
      transformOrigin: `${50 + circdist}% 50%`,
      xPercent: -circdist,
      rotate: 0,
      duration: 1
    }, 'null')
    tlMorph.to('.mainNavHoverCircle:not(:nth-child(1))', {
      transformOrigin: `${50 + circdist}% 50%`,
      xPercent: -circdist,
      rotate: 90,
      duration: 1
    }, 'null')

    tlMorph.addLabel('two')

    tlMorph.to('.mainNavHoverCircleGroup', {
      y: 0,
      rotate: 0,
      duration: 1
    }, 'two')
    tlMorph.to('.mainNavHoverCircle:nth-child(1)', {
      rotate: 0,
      duration: 1,
    }, 'two')
    tlMorph.to('.mainNavHoverCircle:nth-child(2)', {
      rotate: 90,
      duration: 1,
    }, 'two')
    tlMorph.to('.mainNavHoverCircle:nth-child(3)', {
      rotate: 180,
      duration: 1,
    }, 'two')
    tlMorph.to('.mainNavHoverCircle:nth-child(4)', {
      rotate: 270,
      duration: 1,
    }, 'two')
    tlMorph.to('.mainNavHoverCircle:nth-child(5)', {
      rotate: 270,
      duration: 1,
    }, 'two')
    tlMorph.to('.mainNavHoverCircle:nth-child(6)', {
      rotate: 270,
      duration: 1,
    }, 'two')
    tlMorph.to('.mainNavHoverCircle:nth-child(7)', {
      rotate: 270,
      duration: 1,
    }, 'two')

    tlMorph.addLabel('four')

    tlMorph.to('.mainNavHoverCircle:nth-child(1)', {
      rotate: 0,
      duration: 1
    }, 'four')
    tlMorph.to('.mainNavHoverCircle:nth-child(2)', {
      rotate: 60,
      duration: 1
    }, 'four')
    tlMorph.to('.mainNavHoverCircle:nth-child(3)', {
      rotate: 120,
      duration: 1
    }, 'four')
    tlMorph.to('.mainNavHoverCircle:nth-child(4)', {
      rotate: 180,
      duration: 1
    }, 'four')
    tlMorph.to('.mainNavHoverCircle:nth-child(5)', {
      rotate: 240,
      duration: 1
    }, 'four')
    tlMorph.to('.mainNavHoverCircle:nth-child(6)', {
      rotate: 300,
      duration: 1
    }, 'four')
    tlMorph.to('.mainNavHoverCircle:nth-child(7)', {
      rotate: 300,
      duration: 1
    }, 'four')

    tlMorph.addLabel('six')

    tlMorph.to('.mainNavHoverCircle:nth-child(1)', {
      rotate: 0,
      duration: 1
    }, 'six')
    tlMorph.to('.mainNavHoverCircle:nth-child(2)', {
      rotate: 51.4,
      duration: 1
    }, 'six')
    tlMorph.to('.mainNavHoverCircle:nth-child(3)', {
      rotate: 102.8,
      duration: 1
    }, 'six')
    tlMorph.to('.mainNavHoverCircle:nth-child(4)', {
      rotate: 154.3,
      duration: 1
    }, 'six')
    tlMorph.to('.mainNavHoverCircle:nth-child(5)', {
      rotate: 205.7,
      duration: 1
    }, 'six')
    tlMorph.to('.mainNavHoverCircle:nth-child(6)', {
      rotate: 257.1,
      duration: 1
    }, 'six')
    tlMorph.to('.mainNavHoverCircle:nth-child(7)', {
      rotate: 308.6,
      duration: 1
    }, 'six')
    
    tlMorph.addLabel('seven')


    //create an array of all .mainNav__linkList__link elements and for each create a hover eventlistener
    const links = document.querySelectorAll('.mainNav__linkList__link')
    const currentUri = window.location.href;
    let currentLink = -1;
    function getcurrentLinkRect(){
      return links[currentLink].getBoundingClientRect()
    }

    links.forEach((link: HTMLAnchorElement, i) => {
      const linkRect = () => { return link.getBoundingClientRect() }
      const linkAnimLabel = i === 0 ? 'null' 
                            : i === 1 ? 'two' 
                            : i === 2 ? 'four' 
                            : i === 3 ? 'six' 
                            : i === 4 ? 'seven' 
                            : 'null'
      
      if (link.href === currentUri) {
        currentLink = i;
        gsap.set('.mainNavHoverCircleGroup', {
          x: `${linkRect().x - circleGroupCoords().x + 0.5 * linkRect().width - 0.5 * circleGroupCoords().width}px`,
          autoAlpha: 1,
        })
        tlMorph.seek(linkAnimLabel)
      }
      link.addEventListener('mouseenter', (e) => {
        gsap.to('.mainNavHoverCircleGroup', {
          x: `${linkRect().x - circleGroupCoords().x + 0.5 * linkRect().width - 0.5 * circleGroupCoords().width}px`,
          duration: 0.5,
          autoAlpha: 1,
          ease: 'power2.out'
        })
        tlMorph.tweenTo(linkAnimLabel, {
          duration: 0.5,
          ease: 'power2.out'
        })
      })
      link.addEventListener('mouseleave', (e) => {
        if (link.href === currentUri) {
          return
        } else {
          gsap.to('.mainNavHoverCircleGroup', {
            x : currentLink === -1 ? 0 : getcurrentLinkRect().x - circleGroupCoords().x + 0.5 * getcurrentLinkRect().width - 0.5 * circleGroupCoords().width,
            autoAlpha: currentLink === -1 ? 0 : 1,
            duration: 0.5
          })
          tlMorph.tweenTo(
            currentLink === 0 ? 'null' 
            : currentLink === 1 ? 'two' 
            : currentLink === 2 ? 'four' 
            : currentLink === 3 ? 'six' 
            : currentLink === 4 ? 'seven' 
            : 'null', 
            { duration: 0.5})
        }
      })
    })
    

  }, { scope: container })

}