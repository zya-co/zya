import { useRef, useEffect, useState } from "react";
import styles from './IndexNav.module.css';
import gsap from "gsap";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

export default function IndexNav(props) {
  const indexNav = useRef<HTMLDivElement | null>(null);
  const [pageAnchors, setPageAnchors] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {

    const anchors = Array.from(document.querySelectorAll('.dynamicBlock[id]:not([id=""])')).map((anchor) => {
      return {
        id: anchor.id,
        name: anchor.id.replace(/-/g, ' '),
      };
    });

    setPageAnchors(anchors);
    console.log('pageAnchors', anchors);

  }, []);
  
  useEffect(() => {

    let previouslyCreatedSmoother = ScrollSmoother.get();
    
    const navClone = document.querySelector('.indexNav--clone') as HTMLElement;
    if (navClone) {
      navClone.remove();
    }
    
    const root = document.querySelector('main');
    const nav = indexNav.current as HTMLElement;

    if (!nav) return;

    const clone = nav.cloneNode(true) as HTMLElement;
    clone.classList.add('indexNav--clone');
    root?.appendChild(clone);

    const cloneLinks = clone.querySelectorAll('a');
    cloneLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetElement = e.target as HTMLElement;
        if (targetElement) {
          const id = targetElement.getAttribute('href') as string;
          const target = document.querySelector(id);
          if (target) {
            previouslyCreatedSmoother?.scrollTo(target, true, 'top top');
          }
        }
      });
    });

    // add an intersectionObserver that will add a class to the link in the indexnav when the section is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = clone.querySelector(`a[href="#${id}"]`);
        if (entry.isIntersecting) {
          link?.setAttribute('data-inview', 'true');
        } else {
          link?.removeAttribute('data-inview');
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.1
    });

    // Observe each section
    pageAnchors.forEach(anchor => {
      const section = document.getElementById(anchor.id);
      if (section) {
        observer.observe(section);
      }
    });

    // Cleanup function
    return () => {

      cloneLinks.forEach(link => {
        link.removeEventListener('click', (e) => {
          e.preventDefault();
          const targetElement = e.target as HTMLElement;
          if (targetElement) {
            const id = targetElement.getAttribute('href') as string;
            const target = document.querySelector(id);
            if (target) {
              previouslyCreatedSmoother?.scrollTo(target, true, 'top top');
            }
          }
        });
      });
      
      pageAnchors.forEach(anchor => {
        const section = document.getElementById(anchor.id);
        if (section) {
          observer.unobserve(section);
        }
      });
      observer.disconnect();

      if (document.querySelector('.indexNav--clone')) {
        const indexNavs = document.querySelectorAll('.indexNav--clone') as NodeListOf<HTMLElement>;
        indexNavs.forEach( nav => nav.remove() )
      }

    };

  }, [pageAnchors]);

  return (
    <div
      ref={indexNav}
      className={`indexNav ${styles.indexNav}`}
      style={{
        color: `var(--color-${props.color ? props.color : 'fuchsia'})`
      }}
    >
      {pageAnchors.length > 0 ? (
        pageAnchors.map((anchor) => (
          <a key={anchor.id} className={styles.indexNavLink} href={`#${anchor.id}`}>
            <span className={styles.indexNavLinkInner}>{anchor.name}</span>
          </a>
        ))
      ) : (
        <a className={styles.indexNavLink}>Loading Nav...</a>
      )}
    </div>
  );
}

export const indexNavBlockSchema = {
  name: 'indexNav',
  label: 'Index Nav',
  fields: [
    {
      name: 'color',
      label: 'Color',
      type: 'string',
      options: [
        { label: 'Mineral White', value: 'mineral-white' },
        { label: 'Earth Gray', value: 'earth-gray' },
        { label: 'Morpho Teal', value: 'morpho-teal' },
        { label: 'Lichen', value: 'lichen' },
        { label: 'Fuchsia', value: 'fuchsia' },
        { label: 'Beatle', value: 'beatle' },
        { label: 'Amber', value: 'amber' },
      ]
    }
  ]
};