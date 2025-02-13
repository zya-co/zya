import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react/dist";
import { useRef } from "react";

export default function NavigationHover(container, currentPage){
  gsap.registerPlugin(useGSAP);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // runs once on initial render
  useGSAP((context, contextSafe) => {

    function setGroupPos() {
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
    
    window.addEventListener('resize', setGroupPos)

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

    setGroupPos();

    gsap.set('.mainNavHoverCircle', {
      backgroundColor: 'var(--color-fuchsia)',
      width: `${circWidthVw}vw`, 
      height: `${circWidthVw}vw`,
      borderRadius: '50%',
      position: 'absolute',
    })

    const tlMorphFunction = contextSafe(() => {

      const tl = gsap.timeline({
        paused: true, 
        defaults: { ease: 'none'},
      })
      
      tl.addLabel('null')
      
      tl.to('.mainNavHoverCircleGroup', {
        rotate: 45,
        y: `${0.125 * navBarHeight()}`,
        duration: 1
      }, 'null')
      tl.to('.mainNavHoverCircle:nth-child(1)', {
        transformOrigin: `${50 + circdist}% 50%`,
        xPercent: -circdist,
        rotate: 0,
        duration: 1
      }, 'null')
      tl.to('.mainNavHoverCircle:not(:nth-child(1))', {
        transformOrigin: `${50 + circdist}% 50%`,
        xPercent: -circdist,
        rotate: 90,
        duration: 1
      }, 'null')
  
      tl.addLabel('two')
  
      tl.to('.mainNavHoverCircleGroup', {
        y: 0,
        rotate: 0,
        duration: 1
      }, 'two')
      tl.to('.mainNavHoverCircle:nth-child(1)', {
        rotate: 0,
        duration: 1,
      }, 'two')
      tl.to('.mainNavHoverCircle:nth-child(2)', {
        rotate: 90,
        duration: 1,
      }, 'two')
      tl.to('.mainNavHoverCircle:nth-child(3)', {
        rotate: 180,
        duration: 1,
      }, 'two')
      tl.to('.mainNavHoverCircle:nth-child(4)', {
        rotate: 270,
        duration: 1,
      }, 'two')
      tl.to('.mainNavHoverCircle:nth-child(5)', {
        rotate: 270,
        duration: 1,
      }, 'two')
      tl.to('.mainNavHoverCircle:nth-child(6)', {
        rotate: 270,
        duration: 1,
      }, 'two')
      tl.to('.mainNavHoverCircle:nth-child(7)', {
        rotate: 270,
        duration: 1,
      }, 'two')
  
      tl.addLabel('four')
  
      tl.to('.mainNavHoverCircle:nth-child(1)', {
        rotate: 0,
        duration: 1
      }, 'four')
      tl.to('.mainNavHoverCircle:nth-child(2)', {
        rotate: 60,
        duration: 1
      }, 'four')
      tl.to('.mainNavHoverCircle:nth-child(3)', {
        rotate: 120,
        duration: 1
      }, 'four')
      tl.to('.mainNavHoverCircle:nth-child(4)', {
        rotate: 180,
        duration: 1
      }, 'four')
      tl.to('.mainNavHoverCircle:nth-child(5)', {
        rotate: 240,
        duration: 1
      }, 'four')
      tl.to('.mainNavHoverCircle:nth-child(6)', {
        rotate: 300,
        duration: 1
      }, 'four')
      tl.to('.mainNavHoverCircle:nth-child(7)', {
        rotate: 300,
        duration: 1
      }, 'four')
  
      tl.addLabel('six')
  
      tl.to('.mainNavHoverCircle:nth-child(1)', {
        rotate: 0,
        duration: 1
      }, 'six')
      tl.to('.mainNavHoverCircle:nth-child(2)', {
        rotate: 51.4,
        duration: 1
      }, 'six')
      tl.to('.mainNavHoverCircle:nth-child(3)', {
        rotate: 102.8,
        duration: 1
      }, 'six')
      tl.to('.mainNavHoverCircle:nth-child(4)', {
        rotate: 154.3,
        duration: 1
      }, 'six')
      tl.to('.mainNavHoverCircle:nth-child(5)', {
        rotate: 205.7,
        duration: 1
      }, 'six')
      tl.to('.mainNavHoverCircle:nth-child(6)', {
        rotate: 257.1,
        duration: 1
      }, 'six')
      tl.to('.mainNavHoverCircle:nth-child(7)', {
        rotate: 308.6,
        duration: 1
      }, 'six')
      
      tl.addLabel('seven')

      return tl;
    })

    timelineRef.current = tlMorphFunction();

    return () => {
      console.log('cleaning up first Nav useGSAP')
      window.removeEventListener('resize', setGroupPos);
    }

  }, { scope: container, dependencies: [] });


  // runs on every nav update
  useGSAP((context, contextSafe) => {

    //create an array of all .mainNav__linkList__link elements and for each create a hover eventlistener
    const links = document.querySelectorAll('.mainNav__linkList__link')
    const currentUri = currentPage;
    const circWidthVw = 2.3
    const circdist = 45
    const maxgroupWidth = circWidthVw + circWidthVw * circdist * 2 / 100
    let currentLink = -1;
    function getcurrentLinkRect(){
      return links[currentLink].getBoundingClientRect()
    }
    const navBarHeight = () => { return document.querySelector('.mainNav')?.getBoundingClientRect().height || 0 }

    const getLinkAnimLabel = (i) => {
      const linkAnimLabel = i === 0 ? 'null' 
                          : i === 1 ? 'two' 
                          : i === 2 ? 'four' 
                          : i === 3 ? 'six' 
                          : i === 4 ? 'seven' 
                          : 'null';
      return linkAnimLabel;
    }

    const circleGroupCoords = () => { 
      let coords = {
        x: window.innerWidth/2, 
        y: `${0.5 * navBarHeight()}`, 
        height: 0, 
        width: (maxgroupWidth/100*window.innerWidth)
      };
      return coords;
    };

    const mouseEnterHandler = contextSafe((event) => {
      const link = event.target;
      const i = Array.from(links).indexOf(link);
      const linkRect = () => { return link.getBoundingClientRect() }
      gsap.to('.mainNavHoverCircleGroup', {
        x: `${linkRect().x - circleGroupCoords().x + 0.5 * linkRect().width - 0.5 * circleGroupCoords().width}px`,
        duration: 0.5,
        autoAlpha: 1,
        ease: 'power2.out'
      })
      if (timelineRef && timelineRef.current) {
        const tlMorph = timelineRef.current as gsap.core.Timeline;
        tlMorph.tweenTo(getLinkAnimLabel(i), {
          duration: 0.5,
          ease: 'power2.out'
        })
      }
    })
    
    const mouseLeaveHandler = contextSafe((event) => {
      const link = event.target;
      if (link.href.includes(currentUri)) {
        return
      } 
      else {
        gsap.to('.mainNavHoverCircleGroup', {
          x : currentLink === -1 ? 0 : getcurrentLinkRect().x - circleGroupCoords().x + 0.5 * getcurrentLinkRect().width - 0.5 * circleGroupCoords().width,
          autoAlpha: currentLink === -1 ? 0 : 1,
          duration: 0.5
        })
        if (timelineRef && timelineRef.current) {
          const tlMorph = timelineRef.current as gsap.core.Timeline;
          tlMorph.tweenTo(
              currentLink === 0 ? 'null' 
            : currentLink === 1 ? 'two' 
            : currentLink === 2 ? 'four' 
            : currentLink === 3 ? 'six' 
            : currentLink === 4 ? 'seven' 
            : 'null', 
            { duration: 0.5})
          }
      }
    })

    const initNav = contextSafe(() => {
      
      console.log('initNav', currentPage);

      const existingTweens = context.data;

      console.log('existingTweens', existingTweens)
      // existingTweens.forEach((tween) => {
      //   tween.kill();
      // })
      
      const currentPageIsNotInNav = () => {
        return !Array.from(links).some((link: HTMLAnchorElement) => {
          return link.href.endsWith(`/${currentUri}`)
        })
      }

      // initNav: IF the current page is home or the currentpage is not a nav item
      if (currentPage === '' || currentPageIsNotInNav()) {
       
        console.log('page is home or not in nav:', currentPage)
        
        gsap.to('.mainNavHoverCircleGroup', {
          x: 0,
          duration: 0.5,
          autoAlpha: 0,
          ease: 'power2.out',
          overwrite: 'true'
        })

        if (timelineRef && timelineRef.current) {
          const tlMorph = timelineRef.current as gsap.core.Timeline;
          tlMorph.tweenTo(0, {
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'true'
          })
        }

        links.forEach((link: any, i) => {

          const mouseEnter = mouseEnterHandler;
          const mouseLeave = mouseLeaveHandler;
          link.addEventListener('mouseenter', mouseEnter);
          link.addEventListener('mouseleave', mouseLeave);

          // Store the handlers on the link element for later removal
          link._mouseEnterHandler = mouseEnter;
          link._mouseLeaveHandler = mouseLeave;
        })
        
      }
      // initNav: else: the current page is not home and is in the nav
      else {

        links.forEach((link: any, i) => {
  
          const linkRect = () => { return link.getBoundingClientRect() }

          if (link.href.endsWith(`/${currentUri}`)) {
            // console.log('current page is in nav', currentUri)
            currentLink = i;
            gsap.to('.mainNavHoverCircleGroup', {
              x: `${linkRect().x - circleGroupCoords().x + 0.5 * linkRect().width - 0.5 * circleGroupCoords().width}px`,
              duration: 0.5,
              autoAlpha: 1,
              ease: 'power2.out',
              overwrite: 'true'
            })
            if (timelineRef && timelineRef.current) {
              const tlMorph = timelineRef.current as gsap.core.Timeline;
              tlMorph.tweenTo(getLinkAnimLabel(i), {
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'true'
              })
            }
          }
          
          else {
            // console.log('else')
            const mouseEnter = mouseEnterHandler;
            const mouseLeave = mouseLeaveHandler;
            link.addEventListener('mouseenter', mouseEnter);
            link.addEventListener('mouseleave', mouseLeave);
  
            // Store the handlers on the link element for later removal
            link._mouseEnterHandler = mouseEnter;
            link._mouseLeaveHandler = mouseLeave;
          
          }
        })
      }
      
    })

    initNav();
    
    // console.log('context:', context)

    return () => {

      console.log('pre cleaning up')
      
      links.forEach((link: any) => {

        console.log('cleaning up', link)
        
        if (link._mouseEnterHandler && link._mouseLeaveHandler) {
          link.removeEventListener('mouseenter', link._mouseEnterHandler);
          link.removeEventListener('mouseleave', link._mouseLeaveHandler);
          console.log('cleaned up', link)
        }

      });
    }

  }, { scope: container, dependencies: [currentPage] , revertOnUpdate: true});

}