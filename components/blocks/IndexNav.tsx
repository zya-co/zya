import { useRef, useEffect, useState } from "react";
import styles from './IndexNav.module.css';
import { useRouter } from "next/router";

export default function IndexNav(props) {
  const router = useRouter();
  const indexNav = useRef<HTMLDivElement | null>(null);
  const [pageAnchors, setPageAnchors] = useState<{ id: string, name: string }[]>([]);

  
  useEffect(() => {
    
    router.events.on('routeChangeComplete', () => {
      const navClone = document.querySelector('.indexNav--clone') as HTMLElement;
      if (navClone) {
        navClone.remove();
      }
    });
    
    const anchors = Array.from(document.querySelectorAll('.dynamicBlock[id]:not([id=""])')).map((anchor) => {
      return {
        id: anchor.id,
        name: anchor.id.replace(/-/g, ' '),
      };
    });

    setPageAnchors(anchors);

    const root = document.querySelector('#smooth-wrapper');
    const nav = indexNav.current as HTMLElement;

    const delayedFunction = setTimeout(() => {
      if (nav) {
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
        anchors.forEach(anchor => {
          const section = document.getElementById(anchor.id);
          if (section) {
            observer.observe(section);
          }
        });

        // Cleanup function
        return () => {
          
          anchors.forEach(anchor => {
            const section = document.getElementById(anchor.id);
            if (section) {
              observer.unobserve(section);
            }
          });

          if (document.querySelector('.indexNav')) {
            const indexNavs = document.querySelectorAll('.indexNav') as NodeListOf<HTMLElement>;
            indexNavs.forEach( nav => nav.remove() )
          }

          clearTimeout(delayedFunction);
        };
      }
    }
    , 100);
  }, [indexNav]);

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