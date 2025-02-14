import { gsap } from "gsap/dist/gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react/dist";
import { useRef } from "react";
import { useRouter } from "next/router";
import { r } from "../public/admin/assets/mode-indent.es-057a4f6a";


export const ScrollSmooth = (props) => {
  
  const router = useRouter();
  const smoothRef = useRef<HTMLDivElement>(null);
  const smoothScrollerRef = useRef<ScrollSmoother | null>(null);
  
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

  useGSAP((context, contextSafe)=> {

    if(!smoothRef.current) return;

    let smoothContent = smoothRef.current.querySelector("#smooth-content");
    
    smoothScrollerRef.current = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1,
      wrapper: smoothRef.current,
      content: smoothContent,
    });  
  }, {
    scope: smoothRef, 
    // revertOnUpdate: true
  });

  useGSAP((context, contextSafe) => {

    const timeouts: NodeJS.Timeout[] = [];

    // const handleRouteStart = contextSafe((e) => {
    //   console.log('routeChangeStart', e);
    //   smoothScrollerRef.current.scrollTo(0, true, "top top");
    // })
    
    const handleRouteChangeComplete = contextSafe((e) => {
      smoothScrollerRef.current.scrollTop(0);
      if (e.includes('#')) {
        const hash = e.split('#').pop();
        if (hash) {
          const to = setTimeout(() => {
            const hashElement = document.querySelector(`#${hash}`);
            if (!hashElement) return;
            smoothScrollerRef.current.scrollTo(hashElement, true, "top top");
          }, 500);
          timeouts.push(to);
        }
      }
    });

    // const handleHashChange = contextSafe((e) => {
    //   console.log('hashchange', e);
    //   const hash = e;
    //   if (hash) {
    //     const hashElement = document.querySelector(`${hash}`);
    //     if (!hashElement) return;
    //     smoothScrollerRef.current.scrollTo(hashElement, true, "top top");
    //   }
    // });

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    // router.events.on('hashChangeComplete', handleHashChange);
    // router.events.on('routeChangeStart', handleRouteStart);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      // router.events.off('hashChangeComplete', handleHashChange);
      // router.events.off('routeChangeStart', handleRouteStart);
      timeouts.forEach((to) => {
        clearTimeout(to);
      });
    }
  }, {
    scope: smoothRef,
    dependencies: [props.children]
  });

  return (
    <div id="smooth-wrapper" ref={smoothRef}>
      <div id="smooth-content" style={{'willChange': 'transform', width: '100vw'}}>
        {props.children}
      </div>
    </div>
  )
}
