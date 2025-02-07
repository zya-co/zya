import { useRef, useEffect } from "react"
import styles from './IndexNav.module.css';

export default function IndexNav(props) {

  const indexNav = useRef(null);

  useEffect(() => {
      
    const pageAnchors = Array.from(document.querySelectorAll('.dynamicBlock[id]:not([id=""])')).map((anchor) => { 
      return {
      id: anchor.id,
      name: anchor.id.replace(/-/g, ' '),
      }
    });

    const root = document.querySelector('main');
    if (indexNav.current) {
      root?.appendChild(indexNav.current);
      const nav =indexNav.current as HTMLElement;
      
      // Add Links to indexnav menu
      nav.innerHTML = pageAnchors.map((anchor) => 
        `<a class="${styles.indexNavLink}" href="#${anchor.id}">
          <span class="${styles.indexNavLinkInner}">${anchor.name}</span>
        </a>`).join('');

      // add an intersectionobserver that will add a class to the link in the indexnav when the section is in view
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const link = nav.querySelector(`a[href="#${id}"]`);
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


    }
  
    }, [indexNav]);

  return (
    <div 
      ref={indexNav}
      className={styles.indexNav} 
      style={{
        color: `var(--color-${props.color ? props.color : 'fuchsia'})`
      }}
    >
      <a className={styles.indexNavLink}>Loading Nav...</a>
    </div>
  )
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
}