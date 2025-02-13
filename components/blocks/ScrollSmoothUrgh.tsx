import { gsap } from "gsap/dist/gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react/dist";
import { useRef } from "react";
import { useRouter } from "next/router";

export const ScrollSmooth = (props) => {
  
  const router = useRouter();
  const smoothRef = useRef(null);
  
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

  let i = 0;

  useGSAP(()=> {

    if ( i > 0 ) return;

    i++;

    if (!smoothRef.current) return;

    const triggerArray: ScrollTrigger[] = [];

    const setTimeouts: NodeJS.Timeout[] = [];
    
    function isMobile() { return window.innerWidth < 641; }
    const nav = document.querySelector('.mainNav') as HTMLElement;
    const mobileHeader = document.querySelector('.mobileHeader') as HTMLElement;
    const header = isMobile() ? mobileHeader : nav;

    const thisSmoothRef = smoothRef.current as HTMLElement;

    let smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      wrapper: thisSmoothRef
    });  
    
    const cleanup = () => {
      ScrollTrigger.clearScrollMemory();

      setTimeouts.forEach((to) => clearTimeout(to));

      triggerArray.forEach((trigger) => {
        trigger.kill()
        // triggerArray.pop();
      });
    }

    const initDarkElements = () => {
      console.log('initDarkElements');

      header?.removeAttribute('data-isLight');
      
      const darkElements = thisSmoothRef.querySelectorAll('.darkElement');

      darkElements.forEach((el: HTMLElement) => {
        const trigger = ScrollTrigger.create({
          trigger: el,
          scroller: thisSmoothRef,
          start: `top ${header.offsetHeight}px`,
          end: `bottom ${header.offsetHeight - 1}px`,
          onEnter: () => {
            setTimeout(() => {
              header?.setAttribute('data-isLight', 'true');
            }, 10);
          },
          onLeave: () => {
            header?.removeAttribute('data-isLight');
          },
          onEnterBack: () => {
            setTimeout(() => {
              header?.setAttribute('data-isLight', 'true');
            }, 10);
          },
          onLeaveBack: () => {
            header?.removeAttribute('data-isLight');
          },
        });
        triggerArray.push(trigger);
      });
    }

    const handleRouteChange = () => {

      cleanup();

      const thisTO = setTimeout(() => {
        const hash = window.location.hash;
        
        if (hash && smoother.scrollTo) {
          smoother.scrollTop(hash, true, "top top");
        }
        
        gsap.utils.toArray("a[href^='#']").forEach(function (link: HTMLAnchorElement, i) {
          link.addEventListener("click", (e) => {
            var id = (e.target as HTMLAnchorElement)?.getAttribute("href");
            smoother.scrollTo(id, true, "top top");
            e.preventDefault();
          });
        });

        initDarkElements();
        console.log(triggerArray);
      }, 100);
      setTimeouts.push(thisTO);
    }

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange();
    
    return () => {
      cleanup();
      router.events.off('routeChangeComplete', handleRouteChange);
    }

  }, {
    scope: smoothRef.current, 
    dependencies: [smoothRef.current],
  });
  
  return (
    <div id="smooth-wrapper" ref={smoothRef}>
      <div id="smooth-content" style={{'willChange': 'transform', width: '100vw'}}>
        {props.children}
      </div>
    </div>
  )
}
