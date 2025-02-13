import React from 'react'
import { useRef } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import styles from './HeroHome.module.css'
import RichText from '../RichText';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react/dist";

export const HeroHome = (props) => {
  
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const refcontainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {

    if(!refcontainer.current) return;

    const container = refcontainer.current;
    
    gsap.registerPlugin(ScrollTrigger);

  // setTimeout(() => {
    let isMobile = window.innerWidth < 641;

    const parent = container as HTMLElement;
    let fullHeight = parent?.getBoundingClientRect().height || 0;
    const h1coords = container.querySelector('.headline1')?.getBoundingClientRect() || {top: 0, height: 0};
    const shape1rect = container.querySelector('.shape1')?.getBoundingClientRect() || {height: 0};
    const shape2rect = container.querySelector('.shape2')?.getBoundingClientRect() || {height: 0};
    const shape3rect = container.querySelector('.shape3')?.getBoundingClientRect() || {height: 0};
    const contentRect = container.querySelector('.heroContentWrapper')?.getBoundingClientRect() || {height: 0};
    const windowContentDiff = window.innerHeight - contentRect.height;
    const shapeBetween = shape2rect.height * 0.9;
    
    parent.style.height = `${window.innerHeight - windowContentDiff }px`;

    gsap.set('.heroHomeInside', { autoAlpha: 1, overflow: 'hidden'})
    gsap.set('.heroSubhead, .shape', { position: 'fixed', y: '100vh' } )
    gsap.set('.heroContentWrapper', { position: 'absolute', bottom: '0' } )
    gsap.set('.headline1', { 
      display: 'block',
       position: 'fixed',
      autoAlpha: 1, 
      y: isMobile ? `${window.innerHeight/2 - h1coords.height - 10 }` : `${window.innerHeight/2 - h1coords.height/1.5}`, 
      zIndex: 3, 
      mixBlendMode: 'difference'
    });
    gsap.set('.heroSubhead', { 
      y: isMobile ? `${window.innerHeight/2  + 10}` : `${window.innerHeight/2 + h1coords.height/2}`}
    )
    gsap.set('.shape', { zIndex: 2 });
    gsap.set('.shape1', { position: 'fixed', top: `${0.2 * window.innerHeight}`, y: `${0.75 * window.innerHeight}`})
    gsap.set('.shape2', { position: 'fixed', top: `${0.2 * window.innerHeight + shapeBetween + shape1rect.height}`, y: `${0.75 * window.innerHeight}`})
    gsap.set('.shape3', { position: 'fixed', top: `${0.2 * window.innerHeight + 2 * shapeBetween + shape1rect.height + shape2rect.height}`, y: `${0.75 * window.innerHeight}`})
    gsap.set('.shape4', { position: 'fixed', top: `${0.2 * window.innerHeight + 3 * shapeBetween + shape1rect.height + shape2rect.height + shape3rect.height}`, y: `${0.75 * window.innerHeight}`})
    gsap.set('.heroContent1, .heroContent2', { autoAlpha: 0, yPercent: 10 });
    gsap.set('.scrollIndicator', { position: 'fixed', y: '85svh', left: 'var(--spacing-s)'})
    
    const els = {};
    const elsArray = document.querySelectorAll('.headline1, .headline2, .heroSubhead, .shape1, .shape2, .shape3, .shape4');
    elsArray.forEach((element) => {
      els[element.classList[0]] = element.getBoundingClientRect();
    });

    const tl = gsap.timeline({ 
      scrollTrigger: {
        trigger: parent,
        start: 'top top',
        end: `+=${1.25 * fullHeight}px`,
        pin: true,
        scrub: true,
      },
      defaults: { ease: 'none' },
      paused: true,
    });

    tl.addLabel('start');
    
    tl.to('.heroSubhead, .scrollIndicator', {
      yPercent: -50,
      duration: .5,
      autoAlpha: 0,
    })
    
    tl.addLabel('subHead');

    tl.to('.shape1', {
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, 'start')
    
    tl.addLabel('shape1');

    tl.to('.shape2', {
      y: 0,
      duration: .75,
      rotate: 45,
      ease: 'power2.out',
    }, 'shape1-=.5')

    tl.addLabel('shape2');
    
    tl.to('.shape3, .shape4', {
      y: 0,
      duration: .75,
      ease: 'none',
      rotate: 45,
    }, 'shape2-=.25')

    tl.addLabel('shape3');
    
    tl.to('.shape1, .shape2, .shape3, .shape4, .headline1, .headline2', {
      y: isMobile ? '-=80vh' : '-=120vh',
      duration: 1,
      ease: 'power2.out',
    }, 'shape3')
    tl.to('.shape1, .shape2, .shape3, .headline1, .headline2', {
      y: isMobile ? '-=40vh' : '-=0vh',
      duration: .5,
      ease: 'power2.out',
    }, 'shape3+=.5')
    tl.to('.shape4', {
      scale: isMobile ? 6 : 3.5,
      rotate: -30,
      ease: 'power2.in',
      duration: .25,
      onComplete: () => {
        const nav = document.querySelector('.mainNav') as HTMLElement;
        const mobileHeader = document.querySelector('.mobileHeader') as HTMLElement;
        mobileHeader?.setAttribute('data-isLight', 'true');
        nav?.setAttribute('data-isLight', 'true');
      },
      onReverseComplete: () => {
        const nav = document.querySelector('.mainNav') as HTMLElement;
        const mobileHeader = document.querySelector('.mobileHeader') as HTMLElement;
        mobileHeader?.removeAttribute('data-isLight');
        nav?.removeAttribute('data-isLight');
      }
    }, 'shape3+=.25')
    tl.to('.heroContentWrapper', {
      zIndex: 5,
      duration: 1,
    }, 'shape3' )
    tl.set('.heroHomeInside', {
      backgroundColor: 'var(--color-morpho-teal)',
      height: '100%',
      width: '100%',
    }, 'shape3+=.5')
    tl.set('.heroContentWrapper', {
      yPercent: 0,
      backgroundColor: 'var(--color-morpho-teal)',
    })
    tl.to('.heroContent1, .heroContent2', {
      autoAlpha: 1,
      yPercent: 0,
      ease: 'power4.out',
      stagger: 0.1,
      duration: .5,
    } , 'shape3+=.5')
    tl.set('.shape4', {
      display: 'none',
    })

    tl.addLabel('shape4');
    
    tl.addLabel('end');

  }, {scope: refcontainer, dependencies: [refcontainer], revertOnUpdate: true});
  
  const data = props.data
  
  return (
    <div className={`heroHome ${styles.heroHome}`} ref={refcontainer}>
      <div className={`heroHomeInside ${styles.heroHomeInside}`}>
      <div className={`scrollIndicator ${styles.scrollIndicator}`}>
        <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="28" y="0.168945" width="43" height="28" rx="8" transform="rotate(90 28 0.168945)" fill="#E681FF"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M14.8456 31.2354C14.8456 31.8027 15.5315 32.088 15.9326 31.6869L19.5942 28.0253L20.8615 29.2926L16.2515 33.9025C15.0082 35.1459 12.9924 35.1459 11.749 33.9025L7.1391 29.2926L8.40638 28.0253L12.067 31.6859C12.4682 32.0871 13.154 31.803 13.154 31.2357L13.154 20.2932C13.154 20.1243 13.2211 19.9624 13.3405 19.843L13.5496 19.6339C13.7982 19.3852 14.2014 19.3852 14.4501 19.6339L14.6591 19.843C14.7785 19.9624 14.8456 20.1259 14.8456 20.2947C14.8456 24.579 14.8456 27.2516 14.8456 31.2354Z" fill="#340E32"/>
        </svg>
      </div>
        <h1 className={`headline1 ${styles.heroHeadline}`} data-tina-field={tinaField(data.heroHead, 'heroHeadline')}>
          {data.heroHead.heroHeadline}
        </h1>
        <p className={`heroSubhead ${styles.heroSubhead}`} data-tina-field={tinaField(data.heroHead, 'heroSubhead')}>
          {data.heroHead.heroSubhead}
        </p>
        <svg className={`shape1 shape ${styles.shape} ${styles.shape1}`} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="10.1484" cy="10.8657" rx="10.1411" ry="10.1343" transform="rotate(-180 10.1484 10.8657)" fill="#00394C"/>
        </svg>
        <svg  className={`shape2 shape ${styles.shape} ${styles.shape2}`} width="83" height="84" viewBox="0 0 83 84" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M78.7407 32.4137C84.1359 37.7726 84.1359 46.4958 78.7407 51.8546C76.1404 54.4374 74.6831 57.9531 74.6943 61.6168C74.7175 69.2185 68.545 75.3868 60.9382 75.3636C57.2719 75.3525 53.7539 76.8087 51.1694 79.4072C45.8069 84.7988 37.0777 84.7988 31.7152 79.4072C29.1307 76.8087 25.6127 75.3525 21.9464 75.3636C14.3396 75.3868 8.16715 69.2185 8.19031 61.6168C8.20147 57.9531 6.74425 54.4374 4.14393 51.8546C-1.25131 46.4958 -1.25131 37.7726 4.14393 32.4137C6.74425 29.8309 8.20148 26.3152 8.19031 22.6515C8.16715 15.0498 14.3396 8.88156 21.9464 8.90471C25.6127 8.91586 29.1307 7.45962 31.7152 4.86108C37.0777 -0.530518 45.8069 -0.530517 51.1694 4.86108C53.7539 7.45962 57.2719 8.91586 60.9382 8.90471C68.545 8.88156 74.7175 15.0498 74.6943 22.6515C74.6831 26.3153 76.1404 29.8309 78.7407 32.4137Z" fill="#00394C"/>
        </svg>
        <svg className={`shape3 shape ${styles.shape} ${styles.shape3}`} width="338" height="339" viewBox="0 0 338 339" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M260.081 75.392C286.894 75.3104 308.651 97.0526 308.57 123.848C308.53 136.762 313.667 149.154 322.833 158.258C341.85 177.147 341.85 207.896 322.833 226.785C313.667 235.889 308.53 248.281 308.57 261.195C308.651 287.99 286.894 309.732 260.081 309.651C247.158 309.612 234.757 314.745 225.647 323.904C206.745 342.909 175.976 342.909 157.074 323.904C147.964 314.745 135.563 309.612 122.64 309.651C95.8271 309.732 74.0701 287.99 74.1518 261.195C74.1565 259.639 74.0861 258.09 73.9426 256.554C74.3585 256.564 74.7758 256.568 75.1944 256.567C87.7954 256.528 99.8873 261.533 108.77 270.465C127.202 288.996 157.204 288.996 175.636 270.465C184.519 261.534 196.611 256.528 209.212 256.567C235.357 256.646 256.572 235.445 256.493 209.318C256.454 196.725 261.463 184.642 270.4 175.764C288.944 157.346 288.944 127.363 270.4 108.945C261.463 100.067 256.454 87.9838 256.493 75.3912L256.493 75.2698C257.683 75.3546 258.88 75.3956 260.081 75.392ZM256.493 75.2698C256.506 49.1979 235.317 28.063 209.212 28.1424C196.611 28.1808 184.519 23.1756 175.636 14.2442C157.204 -4.28713 127.202 -4.28714 108.771 14.2442C99.8873 23.1756 87.7955 28.1808 75.1944 28.1424C49.049 28.0629 27.834 49.2635 27.9135 75.3912C27.9519 87.9838 22.9433 100.067 14.0059 108.945C-4.53803 127.363 -4.53803 157.346 14.0059 175.764C22.9433 184.642 27.9519 196.725 27.9135 209.318C27.8352 235.027 48.3752 255.966 73.9426 256.554C72.8947 245.342 67.9501 234.792 59.8888 226.785C40.8713 207.895 40.8713 177.147 59.8889 158.258C69.0546 149.154 74.1912 136.762 74.1518 123.848C74.0702 97.0526 95.8271 75.3104 122.64 75.392C135.563 75.4313 147.964 70.2982 157.074 61.1387C175.976 42.134 206.745 42.134 225.647 61.1387C233.911 69.4467 244.881 74.4421 256.493 75.2698ZM199.67 223.861C212.279 223.899 222.51 213.675 222.471 201.075C222.453 195.002 224.868 189.174 229.179 184.893C238.122 176.01 238.122 161.551 229.179 152.668C224.868 148.387 222.453 142.56 222.471 136.487C222.51 123.886 212.279 113.662 199.67 113.7C193.593 113.719 187.761 111.305 183.477 106.998C174.588 98.0606 160.119 98.0606 151.23 106.998C146.946 111.305 141.115 113.719 135.038 113.7C122.429 113.662 112.198 123.886 112.236 136.487C112.254 142.56 109.839 148.387 105.529 152.668C96.5858 161.551 96.5858 176.01 105.529 184.893C109.839 189.174 112.254 195.002 112.236 201.075C112.198 213.675 122.429 223.899 135.038 223.861C141.115 223.843 146.946 226.256 151.23 230.564C160.119 239.501 174.588 239.501 183.477 230.564C187.761 226.256 193.593 223.843 199.67 223.861Z" fill="#00394C"/>
        </svg>
        <div className={styles.shapecontainer}>
          <svg className={`shape4 shape ${styles.shape} ${styles.shape4}`} width="1351" height="1343" viewBox="0 0 1351 1343" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M656.222 55.6022C729.096 -17.7164 847.72 -17.7164 920.593 55.6022C955.716 90.9391 1003.52 110.742 1053.35 110.59C1156.72 110.276 1240.6 194.155 1240.28 297.529C1240.13 347.351 1259.94 395.16 1295.27 430.282C1361.21 495.82 1367.85 598.361 1315.19 671.349C1309.29 663.186 1302.66 655.393 1295.29 648.063C1259.95 612.94 1240.15 565.132 1240.3 515.31C1240.61 411.936 1156.73 328.056 1053.36 328.371C1039.9 328.412 1026.58 326.996 1013.63 324.211C1007.49 226.637 926.248 149.421 827.058 149.723C777.236 149.875 729.428 130.072 694.305 94.7353C680.871 81.2189 665.882 70.1942 649.911 61.6613C652.057 59.6957 654.161 57.6757 656.222 55.6022ZM334.848 323.094C335.989 314.669 336.557 306.129 336.531 297.529C336.216 194.155 420.096 110.276 523.469 110.59C570.368 110.733 615.483 93.1943 649.911 61.6613C579.25 23.9085 489.374 34.9332 429.934 94.7353C394.812 130.072 347.004 149.875 297.181 149.723C193.808 149.409 109.928 233.288 110.243 336.662C110.395 386.484 90.5917 434.293 55.2548 469.415C-12.1732 536.434 -17.5905 642.147 39.0029 715.383C16.996 780.568 32.0596 855.517 84.1936 907.334C119.53 942.456 139.333 990.265 139.182 1040.09C138.867 1143.46 222.747 1227.34 326.12 1227.03C375.942 1226.87 423.751 1246.68 458.873 1282.01C520.24 1343.76 614.051 1353.5 685.663 1311.26C758.172 1359.28 856.882 1351.23 920.607 1287.11C955.729 1251.78 1003.54 1231.97 1053.36 1232.13C1156.73 1232.44 1240.61 1148.56 1240.3 1045.19C1240.15 995.365 1259.95 947.556 1295.29 912.434C1361.23 846.89 1367.86 744.337 1315.19 671.349C1309.29 679.518 1302.65 687.317 1295.27 694.653C1259.94 729.775 1240.13 777.584 1240.28 827.406C1240.6 930.779 1156.72 1014.66 1053.35 1014.34C1050.43 1014.34 1047.52 1014.39 1044.62 1014.52C1050.08 974.138 1068.69 936.394 1097.92 907.334C1165.35 840.316 1170.77 734.602 1114.18 661.366C1136.18 596.181 1121.12 521.232 1068.98 469.415C1033.65 434.293 1013.85 386.484 1014 336.662C1014.01 332.478 1013.88 328.326 1013.63 324.211C978.628 316.688 946.239 299.172 920.607 273.383C859.239 211.641 765.429 201.892 693.816 244.137C621.307 196.121 522.598 204.17 458.873 268.284C425.807 301.552 381.497 321.051 334.848 323.094ZM261.644 671.367C208.966 598.378 215.599 495.825 281.543 430.282C310.78 401.222 329.383 363.478 334.848 323.094C331.947 323.221 329.037 323.281 326.12 323.272C222.747 322.957 138.867 406.837 139.182 510.21C139.333 560.032 119.53 607.841 84.1936 642.963C63.0089 664.019 47.9453 688.895 39.0029 715.383C43.9469 721.781 49.3643 727.931 55.2548 733.786C90.5917 768.908 110.395 816.717 110.243 866.539C109.928 969.912 193.808 1053.79 297.181 1053.48C310.643 1053.44 323.958 1054.85 336.915 1057.64C343.051 1155.21 424.293 1232.43 523.483 1232.13C573.305 1231.97 621.113 1251.78 656.235 1287.11C665.384 1296.32 675.254 1304.37 685.663 1311.26C699.091 1303.34 711.738 1293.59 723.244 1282.01C758.366 1246.68 806.175 1226.87 855.997 1227.03C959.37 1227.34 1043.25 1143.46 1042.94 1040.09C1042.91 1031.49 1043.48 1022.95 1044.62 1014.52C997.969 1016.56 953.659 1036.06 920.593 1069.33C861.154 1129.13 771.278 1140.16 700.617 1102.41C735.045 1070.87 780.16 1053.33 827.058 1053.48C930.432 1053.79 1014.31 969.912 1014 866.539C1013.85 816.717 1033.65 768.908 1068.98 733.786C1090.17 712.73 1105.23 687.854 1114.18 661.366C1109.23 654.968 1103.81 648.818 1097.92 642.963C1062.59 607.841 1042.78 560.032 1042.94 510.21C1043.25 406.837 959.37 322.957 855.997 323.272C806.175 323.424 758.366 303.621 723.244 268.284C714.096 259.079 704.226 251.03 693.816 244.137C680.389 252.058 667.742 261.807 656.236 273.383C621.113 308.72 573.305 328.523 523.483 328.371C420.109 328.056 336.229 411.936 336.544 515.31C336.696 565.132 316.893 612.94 281.556 648.063C274.176 655.398 267.538 663.197 261.644 671.367ZM261.644 671.367C267.535 679.53 274.168 687.323 281.543 694.653C316.88 729.775 336.683 777.584 336.531 827.406C336.216 930.779 420.096 1014.66 523.469 1014.34C573.292 1014.19 621.1 1034 656.222 1069.33C669.657 1082.85 684.646 1093.87 700.617 1102.41C698.471 1104.37 696.366 1106.39 694.305 1108.47C621.432 1181.78 502.808 1181.78 429.934 1108.47C404.302 1082.68 371.913 1065.16 336.915 1057.64C336.656 1053.52 336.531 1049.37 336.544 1045.19C336.696 995.365 316.893 947.556 281.556 912.434C215.618 846.896 208.98 744.354 261.644 671.367ZM743.726 407.326C704.288 367.648 640.092 367.647 600.655 407.326C581.647 426.449 555.775 437.166 528.812 437.084C472.869 436.914 427.475 482.307 427.646 538.25C427.728 565.213 417.011 591.086 397.888 610.093C358.209 649.53 358.209 713.727 397.888 753.164C417.011 772.171 427.728 798.044 427.646 825.006C427.475 880.949 472.869 926.343 528.812 926.173C555.775 926.091 581.647 936.808 600.655 955.931C640.092 995.609 704.288 995.609 743.726 955.931C762.733 936.808 788.606 926.091 815.568 926.173C871.511 926.343 916.905 880.949 916.735 825.006C916.653 798.044 927.37 772.171 946.493 753.164C986.171 713.727 986.171 649.53 946.493 610.093C927.37 591.086 916.653 565.213 916.735 538.25C916.905 482.307 871.511 436.914 815.568 437.084C788.606 437.166 762.733 426.449 743.726 407.326Z" fill="#00394C"/>
          </svg>
        </div>
          <div className={`heroContentWrapper ${styles.heroContentWrapper}`}>
            <div className={styles.heroContentContent}>
              <div className={`heroContent1 ${styles.heroContent} ${styles.heroContent1}`} data-tina-field={tinaField(data, "heroContentOne")}>
                <TinaMarkdown content={data.heroContentOne} />
              </div>
              <div className={`heroContent2 ${styles.heroContent} ${styles.heroContent2}`} data-tina-field={tinaField(data, "heroContentTwo")}>
                <RichText content={data.heroContentTwo} />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}