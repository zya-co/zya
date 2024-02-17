import React, { useEffect, useRef } from "react";

export default function DarkElement(props) {

  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    function isMobile() {
      return window.innerWidth < 641;
    }

    const header = isMobile() ? document.querySelector('.mobileHeader') as HTMLElement : document.querySelector('.mainNav') as HTMLElement;
    const options = {
      rootMargin: `${header?.offsetHeight * -0.5}px 0px ${ -1 * (window.innerHeight - 0.5 * header?.offsetHeight) }px 0px`,
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elem = entry.target as HTMLElement;
        const nav = document.querySelector('.mainNav') as HTMLElement;
        const mobileHeader = document.querySelector('.mobileHeader') as HTMLElement;
        if (entry.isIntersecting) {
          setTimeout(() => {
              nav?.setAttribute('data-isLight', 'true')
              mobileHeader?.setAttribute('data-isLight', 'true')
          }, 10)
        } else {
          nav?.removeAttribute('data-isLight')
          mobileHeader?.removeAttribute('data-isLight')
          
          //nav?.removeAttribute('data-isLight')
        }
      });
    }, options);
    if (container.current) {
      observer.observe(container.current);
    }
    return () => {
      if (container.current) {
        observer.unobserve(container.current);
      }
    }
  })

  return (
    <div ref={container}>
      {props.children}
    </div>
  )
}