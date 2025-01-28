import { gsap } from "gsap";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export const ScrollSmooth = (props) => {

  const smoothRef = useRef(null);

  useGSAP(()=> {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
    
    let smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
    });  

    gsap.utils.toArray("a[href^='#']").forEach(function (link: HTMLAnchorElement, i) {
      link.addEventListener("click", (e) => {
        var id = (e.target as HTMLAnchorElement)?.getAttribute("href");
        smoother.scrollTo(id, true, "top top");
        e.preventDefault();
      });
    });

  }, {scope: smoothRef});
  
  return (
    <>
      <div id="smooth-wrapper" ref={smoothRef}>
        <div id="smooth-content" style={{'willChange': 'transform'}}>
          {props.children}
        </div>
      </div>
    </>
  )
}
