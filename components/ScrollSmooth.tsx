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

  useGSAP(()=> {
    
    let smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      wrapper: smoothRef.current
    });  

    const timeouts: NodeJS.Timeout[] = [];
    
    const handleRouteChange = () => {

      const tout = setTimeout(() => {

        const hash = window.location.hash;
        
        if (hash && smoother.scrollTo) {
          smoother.scrollTo(hash, true, "top top");
        }
        
        gsap.utils.toArray("a[href^='#']").forEach(function (link: HTMLAnchorElement, i) {
          link.addEventListener("click", (e) => {
            var id = (e.target as HTMLAnchorElement)?.getAttribute("href");
            smoother.scrollTo(id, true, "top top");
            e.preventDefault();
          });
        });
      }, 100);

      timeouts.push(tout);
    }
    
    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange();

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      timeouts.forEach((timeout) => clearTimeout(timeout));
    }

  }, {
    scope: smoothRef, 
    dependencies: [props.children],
  });
  
  return (
    <div id="smooth-wrapper" ref={smoothRef}>
      <div id="smooth-content" style={{'willChange': 'transform', width: '100vw'}}>
        {props.children}
      </div>
    </div>
  )
}
