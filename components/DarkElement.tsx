import React, { useEffect, useRef } from "react";

export default function DarkElement(props) {

  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = document.querySelector('.mainNav') as HTMLElement;
    const options = {
      rootMargin: `${header?.offsetHeight * -0.5}px 0px ${ -1 * (window.innerHeight - 0.5 * header?.offsetHeight) }px 0px`,
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elem = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // alert('intersecting: '+ props.color)
          document.querySelector('.mainNav')?.setAttribute('data-isLight', 'true')
        } else {
          // alert('not intersecting: ' + props.color)
          document.querySelector('.mainNav')?.removeAttribute('data-isLight')
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