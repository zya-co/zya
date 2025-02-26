import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react/dist";
import { useRef, useState } from 'react';

export default function NavigationHover(container, currentPage){
  gsap.registerPlugin(useGSAP);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [windowWidth, setWindowWidth] = useState(1000);

  // runs once on initial render, creating the animation timeline
  useGSAP((context, contextSafe) => {
    
    const circWidthVw = 2.3
    const circdist = 45
    const maxgroupWidth = circWidthVw + circWidthVw * circdist * 2 / 100
    const navBarHeight = () => {
      const height = document.querySelector('.mainNav')?.getBoundingClientRect().height || 0;
      return height;
    }

    const circleGroupOriginCoords = () => { 
      let coords = {
        x: windowWidth/2.5, 
        y: `${0.5 * navBarHeight()}`, 
        height: 0, 
        width: (maxgroupWidth/100*windowWidth)
      };
      return coords;
    };
    
    const linksCoords = () => {
      const links = Array.from(document.querySelectorAll('.mainNav__linkList__link'));
      const linkmap = links.map((link: HTMLAnchorElement) => {
        return link.getBoundingClientRect()
      });
      return linkmap;
    }

    let null_x;
    let one_x;
    let two_x;
    let four_x;
    let six_x;


    const setGroupOriginPos = contextSafe(() => {
      gsap.set('.mainNavHoverCircleGroup', {
        position: 'absolute',
        left: circleGroupOriginCoords().x,
        top: circleGroupOriginCoords().y,
        autoAlpha: 0,
        width: circleGroupOriginCoords().width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: -1
      })
      null_x = linksCoords()[0].x - circleGroupOriginCoords().x + 0.5 * linksCoords()[0].width - 0.5 * circleGroupOriginCoords().width;
      one_x = linksCoords()[1].x - circleGroupOriginCoords().x + 0.5 * linksCoords()[1].width - 0.5 * circleGroupOriginCoords().width;
      two_x = linksCoords()[2].x - circleGroupOriginCoords().x + 0.5 * linksCoords()[2].width - 0.5 * circleGroupOriginCoords().width;
      four_x = linksCoords()[3].x - circleGroupOriginCoords().x + 0.5 * linksCoords()[3].width - 0.5 * circleGroupOriginCoords().width;
      six_x = linksCoords()[4].x - circleGroupOriginCoords().x + 0.5 * linksCoords()[4].width - 0.5 * circleGroupOriginCoords().width;
    })
    
    // add circles and style them with gsap
    if (!document.querySelector('.mainNavHoverCircleGroup ')) {
      const circleGroup = document.createElement('div');
      circleGroup.classList.add('mainNavHoverCircleGroup');
      document.querySelector('.mainNav')?.appendChild(circleGroup);

      for (let i = 0; i < 7; i++ ) {
        if (document.querySelectorAll('.mainNavHoverCircle').length === 7) {
          break;
        }
        const circle = document.createElement('div');
        circle.classList.add('mainNavHoverCircle');
        document.querySelector('.mainNavHoverCircleGroup')?.appendChild(circle);
      }
    }

    setGroupOriginPos();

    gsap.set('.mainNavHoverCircle', {
      backgroundColor: 'var(--color-fuchsia)',
      width: `${circWidthVw}vw`, 
      height: `${circWidthVw}vw`,
      borderRadius: '50%',
      position: 'absolute',
    })


    tlRef.current = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0, 
        defaults: { 
          ease: 'none',
          duration: 1,
        },
      })

      tlRef.current.addLabel('null')


      tlRef.current.to('.mainNavHoverCircleGroup', {
        rotate: 0,
        y: 0,
        x: `${null_x}px`,
        autoAlpha: 1,
      }, 'null')

      tlRef.current.to('.mainNavHoverCircle:nth-child(1)', {
        transformOrigin: `${50 + circdist}% 50%`,
        xPercent: 0,
        rotate: 0,
      }, 'null')

      tlRef.current.to('.mainNavHoverCircle:not(:nth-child(1))', {
        transformOrigin: `${50 + circdist}% 50%`,
        xPercent: 0,
        rotate: 0,
      }, 'null')
      
      tlRef.current.addLabel('one')

      tlRef.current.to('.mainNavHoverCircleGroup', {
        rotate: 45,
        y: `${0.125 * navBarHeight()}`,
        x: `${one_x}px`,
        autoAlpha: 1,
        onStart: () => {
          // console.log('one')
        }
      }, 'one')

      tlRef.current.to('.mainNavHoverCircle:nth-child(1)', {
        transformOrigin: `${50 + circdist}% 50%`,
        xPercent: -circdist,
        rotate: 0,
      }, 'one')

      tlRef.current.to('.mainNavHoverCircle:not(:nth-child(1))', {
        transformOrigin: `${50 + circdist}% 50%`,
        xPercent: -circdist,
        rotate: 90,
      }, 'one')
  
      tlRef.current.addLabel('two')
  
      tlRef.current.to('.mainNavHoverCircleGroup', {
        y: 0,
        rotate: 0,
        x: `${two_x}px`,
        autoAlpha: 1,
      }, 'two')
      tlRef.current.to('.mainNavHoverCircle:nth-child(1)', {
        rotate: 0,
      }, 'two')
      tlRef.current.to('.mainNavHoverCircle:nth-child(2)', {
        rotate: 90,
      }, 'two')
      tlRef.current.to('.mainNavHoverCircle:nth-child(3)', {
        rotate: 180,
      }, 'two')
      tlRef.current.to('.mainNavHoverCircle:nth-child(4)', {
        rotate: 270,
      }, 'two')
      tlRef.current.to('.mainNavHoverCircle:nth-child(5)', {
        rotate: 270,
      }, 'two')
      tlRef.current.to('.mainNavHoverCircle:nth-child(6)', {
        rotate: 270,
      }, 'two')
      tlRef.current.to('.mainNavHoverCircle:nth-child(7)', {
        rotate: 270,
      }, 'two')
  
      tlRef.current.addLabel('four')
  
      tlRef.current.to('.mainNavHoverCircleGroup', {
        y: 0,
        rotate: 0,
        x: `${four_x}px`,
        autoAlpha: 1,
      }, 'four')
      tlRef.current.to('.mainNavHoverCircle:nth-child(1)', {
        rotate: 0,
      }, 'four')
      tlRef.current.to('.mainNavHoverCircle:nth-child(2)', {
        rotate: 60,
      }, 'four')
      tlRef.current.to('.mainNavHoverCircle:nth-child(3)', {
        rotate: 120,
      }, 'four')
      tlRef.current.to('.mainNavHoverCircle:nth-child(4)', {
        rotate: 180,
      }, 'four')
      tlRef.current.to('.mainNavHoverCircle:nth-child(5)', {
        rotate: 240,
      }, 'four')
      tlRef.current.to('.mainNavHoverCircle:nth-child(6)', {
        rotate: 300,
      }, 'four')
      tlRef.current.to('.mainNavHoverCircle:nth-child(7)', {
        rotate: 300,
      }, 'four')
  
      tlRef.current.addLabel('six')
  
      tlRef.current.to('.mainNavHoverCircleGroup', {
        y: 0,
        rotate: 0,
        x: `${six_x}px`,
        autoAlpha: 1,
      }, 'six')
      tlRef.current.to('.mainNavHoverCircle:nth-child(1)', {
        rotate: 0,
      }, 'six')
      tlRef.current.to('.mainNavHoverCircle:nth-child(2)', {
        rotate: 51.4,
      }, 'six')
      tlRef.current.to('.mainNavHoverCircle:nth-child(3)', {
        rotate: 102.8,
      }, 'six')
      tlRef.current.to('.mainNavHoverCircle:nth-child(4)', {
        rotate: 154.3,
      }, 'six')
      tlRef.current.to('.mainNavHoverCircle:nth-child(5)', {
        rotate: 205.7,
      }, 'six')
      tlRef.current.to('.mainNavHoverCircle:nth-child(6)', {
        rotate: 257.1,
      }, 'six')
      tlRef.current.to('.mainNavHoverCircle:nth-child(7)', {
        rotate: 308.6
      }, 'six')
      
      tlRef.current.addLabel('seven')

    return () => {
      tlRef.current?.clear();
    }

  }, { scope: container, dependencies: [windowWidth], revertOnUpdate: true });


  // Update window width on resize
  useGSAP(() => {
    const handleResize = () => {
      if (window.innerWidth === windowWidth || window.innerWidth <= 640 ) return;
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // runs on every nav update
  useGSAP((context, contextSafe) => {

    // console.log('context 0: ', context.data)

    //create an array of all .mainNav__linkList__link elements and for each create a hover eventlistener
    const links = Array.from(document.querySelectorAll('.mainNav__linkList__link'))

    links.forEach((link: any, i) => {

      if (link._mouseEnterHandler && link._mouseLeaveHandler && link._clickHandler) {
        link.removeEventListener('mouseenter', link._mouseEnterHandler);
        link.removeEventListener('mouseleave', link._mouseLeaveHandler);
        link.removeEventListener('click', link._clickHandler);
        // console.log('cleaned up', link)
      }
    })

    const tweenArrayForCleanup = context.data;

    tweenArrayForCleanup.forEach((tween) => {
      tween.revert();
    })

    context.data = [];

    const currentUri = currentPage;
    let currentLink = -1;

    const getLinkAnimLabel = (i) => {
      const linkAnimLabel = i === 0 ? 'one' 
                          : i === 1 ? 'two' 
                          : i === 2 ? 'four' 
                          : i === 3 ? 'six' 
                          : i === 4 ? 'seven' 
                          : 'null';
      return linkAnimLabel;
    }

    const onEnterClickHandler = contextSafe((event) => {
      const link = event.target;
      link.removeEventListener('mouseleave', link._mouseLeaveHandler);
      if (tlRef.current) {
        const i = Array.from(links).indexOf(link);
        const tlMorph = tlRef.current as gsap.core.Timeline;
        tlMorph.tweenTo(getLinkAnimLabel(i), {
          duration: 0,
        })
        setWindowWidth(window.innerWidth);
      }
    })

    const mouseEnterHandler = contextSafe((event) => {
      const link = event.target;
      const i = Array.from(links).indexOf(link);
      
      if (tlRef.current) {
        const tlMorph = tlRef.current as gsap.core.Timeline;
        tlMorph.tweenTo(getLinkAnimLabel(i), {
          duration: 0.5,
          ease: 'power2.inOut'
        })
      }
    })
    
    const mouseLeaveHandler = contextSafe((event) => {
      const link = event.target;
      if (link.href.includes(currentUri) && currentLink !== -1) {
        return
      } 
      else {
        if (tlRef.current) {
          const tlMorph = tlRef.current as gsap.core.Timeline;
          tlMorph.tweenTo(
              currentLink === 0 ? 'one' 
            : currentLink === 1 ? 'two' 
            : currentLink === 2 ? 'four' 
            : currentLink === 3 ? 'six' 
            : currentLink === 4 ? 'seven' 
            : 'null', 
            { 
              duration: 0.5,
              ease: 'power2.inOut'
            })
          }
      }
    })

    const initNav = contextSafe(() => {
      
      const currentPageIsNotInNav = () => {
        return !Array.from(links).some((link: HTMLAnchorElement) => {
          return link.href.endsWith(`${currentUri}`)
        })
      }

      // initNav: IF the current page is home or the currentpage is not a nav item
      if (currentPage === '' || currentPageIsNotInNav()) {
       
        if (tlRef.current) {
          const tlMorph = tlRef.current as gsap.core.Timeline;
          tlMorph.seek(0)
        }

        links.forEach((link: any, i) => {

          const mouseEnter = mouseEnterHandler;
          const mouseLeave = mouseLeaveHandler;
          const click = onEnterClickHandler;
          link.addEventListener('mouseenter', mouseEnter);
          link.addEventListener('mouseleave', mouseLeave);
          link.addEventListener('click', click);

          // Store the handlers on the link element for later removal
          link._mouseEnterHandler = mouseEnter;
          link._mouseLeaveHandler = mouseLeave;
          link._clickHandler = click;
        })
        
      }
      // initNav: else: the current page is not home and is in the nav
      else {

        links.forEach((link: any, i) => {
  
          if (link.href.endsWith(`/${currentUri}`)) {
            currentLink = i;
            
            if (tlRef.current) {
              const tlMorph = tlRef.current as gsap.core.Timeline;
              tlMorph.seek(getLinkAnimLabel(i))
            }
          }
          else {
            // console.log('else')
          const mouseEnter = mouseEnterHandler;
          const mouseLeave = mouseLeaveHandler;
          const click = onEnterClickHandler;
          link.addEventListener('mouseenter', mouseEnter);
          link.addEventListener('mouseleave', mouseLeave);
          link.addEventListener('click', click);

          // Store the handlers on the link element for later removal
          link._mouseEnterHandler = mouseEnter;
          link._mouseLeaveHandler = mouseLeave;
          link._clickHandler = click;
          }
        })
      }
      
    })

    initNav();
    
    return () => {

      // console.log('pre cleaning up')
      
      links.forEach((link: any) => {

        // console.log('cleaning up', link)
        
        if (link._mouseEnterHandler && link._mouseLeaveHandler && link._clickHandler) {
          link.removeEventListener('mouseenter', link._mouseEnterHandler);
          link.removeEventListener('mouseleave', link._mouseLeaveHandler);
          link.removeEventListener('click', link._clickHandler);
          // console.log('cleaned up', link)
        }

      });
    }

  }, { scope: container, dependencies: [currentPage, tlRef, windowWidth] , revertOnUpdate: true});

}