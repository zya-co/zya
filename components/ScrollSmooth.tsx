import { gsap } from "gsap/dist/gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react/dist";
import { useRef } from "react";

export const ScrollSmooth = (props) => {
  
  const smoothRef = useRef<HTMLDivElement>(null);
  
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

  useGSAP(()=> {

    if(!smoothRef.current) return;

    let smoothContent = smoothRef.current.querySelector("#smooth-content");
    
    let smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      wrapper: smoothRef.current,
      content: smoothContent,
    });  

    const clickHandler = (e) => {
      e.preventDefault();
      const id = e.target.getAttribute("href");
      smoother.scrollTo(id, true, "top top");
      console.log('clicked', e.target);
    }



    
    
    const delayedInitFunction = setTimeout(() => {
      
      // gsap.utils.toArray("a[href^='#']").forEach(function (link: HTMLAnchorElement) {
      //   link.addEventListener("click", (e) => clickHandler);
      // });

      const hash = window.location.hash;
      console.log('hash', hash);
      
      if (hash) {
        const hashElement = document.querySelector(`${hash}`);
        if (!hashElement) return;
        smoother.scrollTo(hashElement, true, "top top");
        console.log('hashElement', hashElement);
      }


    }, 500);

    return () => {
      // gsap.utils.toArray("a[href^='#']").forEach(function (link: HTMLAnchorElement, i) {
      //   link.removeEventListener("click", (e) => clickHandler);
      // });
      clearTimeout(delayedInitFunction);
    }

  }, {
    scope: smoothRef, 
    dependencies: [props.children],
    revertOnUpdate: true
  });
  
  return (
    <div id="smooth-wrapper" ref={smoothRef}>
      <div id="smooth-content" style={{'willChange': 'transform', width: '100vw'}}>
        {props.children}
      </div>
    </div>
  )
}
