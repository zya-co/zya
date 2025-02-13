import React, { useEffect, useRef } from "react";
import { d } from "../public/admin/assets/dialog.es-dffe62e7";
// import { useRouter } from "next/router";

export default function DarkElement({children, ignore = false, ...props}) {

  // const router = useRouter();
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
      entries.forEach((entry: any) => {
        
        const nav = document.querySelector('.mainNav') as HTMLElement;
        const mobileHeader = document.querySelector('.mobileHeader') as HTMLElement;
        
        if (entry.isIntersecting) {
          const timeoutId =setTimeout(() => {
              nav?.setAttribute('data-isLight', 'true')
              mobileHeader?.setAttribute('data-isLight', 'true')
          }, 10)
          // Store the timeout ID on the entry for cleanup
          entry.target._timeoutId = timeoutId;
        } 
        else {
          nav?.removeAttribute('data-isLight')
          mobileHeader?.removeAttribute('data-isLight')
        }
      });
    }, options);
    if (container.current) {
      observer.observe(container.current);
      console.log('observing', container.current);
    }
    return () => {
      console.log('cleaning up');

      if (container.current) {
        observer.unobserve(container.current);
        observer.disconnect();
      }

      const entries = observer.takeRecords();
      entries.forEach((entry: any) => {
        if (entry.target._timeoutId) {
          clearTimeout(entry.target._timeoutId);
        }
      });
    }
  }, [])

  if (ignore) {
    return (
      <>
        {children}
      </>
    )
  } 
  else {
    return (
      <div ref={container}>
        {children}
      </div>
    )
  }
}