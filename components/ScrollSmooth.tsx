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
    }

    const hash = window.location.hash;
    
    if (hash && smoother.scrollTop) {
      const hashElement = document.querySelector(`${hash}`);
      if (!hashElement) return;
      smoother.scrollTo(hashElement, true, "top top");
    }
    else {
      smoother.scrollTop(0);
    }

    const delayedInitFunction = setTimeout(() => {

      gsap.utils.toArray("a[href^='#']").forEach(function (link: HTMLAnchorElement, i) {
        link.addEventListener("click", (e) => clickHandler);
      });

    }, 100);

    return () => {
      clearTimeout(delayedInitFunction);
      gsap.utils.toArray("a[href^='#']").forEach(function (link: HTMLAnchorElement, i) {
        link.removeEventListener("click", (e) => clickHandler);
      });
      smoother.kill();
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
