import styles from './Media_Articles.module.css';
import Button from '../Button';
import { useRef } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react/dist";

export default function Media_Articles({data}) {
  
  const smoothRef = useRef(null);
  
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(() => {
    
    function getDistance() {
      const articles = gsap.utils.toArray(`.${styles.article}`) as HTMLElement[];
      const distanceFirstToLastX = articles[articles.length - 1].offsetLeft - articles[0].offsetLeft;
      return distanceFirstToLastX;
    }
    let distanceFirstToLastX = getDistance();

    let tl = gsap.timeline({ paused: true });
    tl.to(smoothRef.current, {
      x: -distanceFirstToLastX,
      duration: 8,
    });
    
    window.addEventListener('resize', () => {
      distanceFirstToLastX = getDistance();
      tl.to(smoothRef.current, {
        x: -distanceFirstToLastX,
        duration: 8,
      });
    });
    

    ScrollTrigger.create({
      trigger: smoothRef.current,
      start: '100% 80%',
      end: `+=${distanceFirstToLastX}`,
      // markers: true,
      animation: tl,
      scrub: true,
      pin: true,
      toggleActions: 'play none none none',
    });


  }, {scope: smoothRef});

  return (
    <div className={styles.articles} >
      <div className={styles.articlesContainer} ref={smoothRef}>
        {data.articles &&

          data.articles.map((article, index) => {
            return (
              <div key={index} className={styles.article}>
                <div className={styles.articleContent}>
                  <h4 className={styles.articleQuote}>{article.quote}</h4>
                  <p className={styles.articleDescription}>{article.description}</p>
                </div>
                <div className={styles.articlefooter}>
                  <div className={styles.articleSource}>
                    {article.sourceLogo && 
                      <a href={article.link || ''} target="_blank">
                        {/* <img className={styles.articleSourceLogo} src={article.sourceLogo.src} alt={article.sourceLogo.alt} /> */}
                        <div
                          className={styles.articleSourceLogo}
                          style={{
                            maskImage: `url(${article.sourceLogo.src})`,
                          }}
                        >
                        </div>
                      </a>
                    }
                  </div>
                  <Button className={styles.cta} href={article.link} color='mineral-white' variant='arrowRightMini'>Read</Button>
                </div>
              </div>
            )
          })
        }
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}

export const media_ArticlesBlockSchema = {
  name: 'mediaArticles',
  label: 'Media Reports',
  type: 'object',
  fields: [
    {
      name: 'articles',
      label: 'Articles',
      type: 'object',
      list: true,
      fields: [
        {
          name: 'quote',
          label: 'Quote',
          type: 'string',
          ui: {
            component: 'textarea'
          }
        },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
          ui: {
            component: 'textarea'
          }
        },
        {
          name: 'source',
          label: 'Source',
          type: 'string',
        },
        {
          name: 'sourceLogo',
          label: 'Source Logo',
          type: 'object',
          fields: [
            {
              name: 'src',
              label: 'Image',
              type: 'image',
            },
            {
              name: 'alt',
              label: 'Alt Text',
              type: 'string',
            },
          ]
        },
        {
          name: 'link',
          label: 'Link',
          type: 'string',
        },
      ]
    }
  ]


}