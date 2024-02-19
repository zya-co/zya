import { gsap } from "gsap";
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

export const ScrollSmooth = (props) => {

  useGSAP(()=> {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
    
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });  
  })

  const meta = {
    title: props.title || 'Zya Enzymes',
    description: props.description || 'The transformative power of enzymes',
    metaimg: props.metaimg || '/favicon.ico'
  }

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {props.children}
        </div>
      </div>
    </>
  )
}
