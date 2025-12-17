import { gsap } from "gsap/dist/gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react/dist";
import { useRef } from "react";
import { useRouter } from "next/router";

export const ScrollSmooth = (props) => {
  
  const router = useRouter();
  const smoothRef = useRef<HTMLDivElement>(null);
  const smoothScrollerRef = useRef<ScrollSmoother | null>(null);
  
  useGSAP((context, contextSafe)=> {

    if(!smoothRef.current || typeof window === 'undefined') return;

    // Register plugins on client side only
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    let smoothContent = smoothRef.current.querySelector("#smooth-content");
    
    if (!smoothContent) return;
    
    smoothScrollerRef.current = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 1,
      normalizeScroll: true,
      wrapper: smoothRef.current,
      content: smoothContent,
      ignoreMobileResize: true,
    });  
  }, {
    scope: smoothRef, 
    // revertOnUpdate: true
  });

  useGSAP((context, contextSafe) => {

    const timeouts: NodeJS.Timeout[] = [];
    const isMobile = () => {  return window.matchMedia('(max-width: 640px)').matches; }

    const handleRouteChangeStart = contextSafe((e) => {
      // timeouts.forEach((to) => { clearTimeout(to) });
    });
    
    const handleRouteChangeComplete = contextSafe((e) => {
      
      if ( e.includes('#') ) {
        const hash = e.split('#').pop();
        smoothScrollerRef.current.scrollTop(0);
        const to = setTimeout(() => {
          const hashElement = document.querySelector(`#${hash}`);
          if (!hashElement) return;
          smoothScrollerRef.current.scrollTo(hashElement, true, 0, 0);
        }, 500);
        timeouts.push(to);
      }
      else {
        smoothScrollerRef.current.scrollTop(0);
      }
    });

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      timeouts.forEach((to) => { clearTimeout(to) });
    }
  }, {
    scope: smoothRef,
    dependencies: []
  });

  return (
    <>
      <div id="smooth-wrapper" ref={smoothRef}>
        <div id="smooth-content" style={{'willChange': 'transform', width: '100vw'}}>
          {props.children}
        </div>
      </div>
    </>
  )
}
