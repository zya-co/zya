import { useRef, useEffect, useState } from "react";
import styles from './IndexNav.module.css';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import page from "../../tina/collections/page";

gsap.registerPlugin(ScrollTrigger);

export default function IndexNav(props) {
  const indexNav = useRef<HTMLDivElement | null>(null);
  const [pageAnchors, setPageAnchors] = useState<{ id: string, name: string }[]>([]);

  // Runs once:
  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll('.dynamicBlock[id]:not([id=""])')).map((anchor) => {
      return {
        id: anchor.id,
        name: anchor.id.replace(/-/g, ' '),
      };
    });
    console.log('setpageanchors', anchors);
    setPageAnchors(anchors);
  }, []);
  
  // Runs when pageAnchors changes:
  useEffect(() => {
    if (!pageAnchors.length) return;

    const navClone = document.querySelector('.indexNav--clone') as HTMLElement;
    if (navClone) { navClone.remove(); }
    const root = document.querySelector('main');
    const nav = indexNav.current as HTMLElement;
    if (!nav) return;
    const clone = nav.cloneNode(true) as HTMLElement;
    clone.classList.add('indexNav--clone');
    root?.appendChild(clone);

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
      pageAnchors.forEach(anchor => {
        const section = document.getElementById(anchor.id);
        if (section) {
          observer.unobserve(section);
        }
      });
      observer.disconnect();
      if (document.querySelector('.indexNav--clone')) {
        const indexNavs = document.querySelectorAll('.indexNav--clone') as NodeListOf<HTMLElement>;
        indexNavs.forEach(nav => nav.remove());
      }
    };
  }, [pageAnchors]);

  // Scroll event listener logic
  useEffect(() => {
    const navClone = document.querySelector('.indexNav--clone') as HTMLElement;
    if (!navClone) return;

    const scrollIsMoreThanFirstAnchor = () => {
      const firstAnchor = document.getElementById(pageAnchors[0]?.id);
      if (!firstAnchor) return false;
      return window.scrollY > firstAnchor.getBoundingClientRect().top;
    };

    const scrollHandler = () => {
      if (scrollIsMoreThanFirstAnchor()) {
        navClone.classList.add('indexNav--clone--visible');
      } else {
        navClone.classList.remove('indexNav--clone--visible');
      }
    };

    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const debouncedScrollHandler = debounce(scrollHandler, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
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