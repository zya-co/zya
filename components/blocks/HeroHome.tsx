import React, { useRef } from 'react';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import styles from './HeroHome.module.css'
import RichText from '../RichText';
import DarkElement from '../DarkElement';
import { gsap } from 'gsap/dist/gsap';
import { useGSAP } from "@gsap/react/dist";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { GSDevTools } from "gsap/GSDevTools";


export const HeroHome = (props) => {

  const refcontainer = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  
  useGSAP(() => {

    if (!refcontainer.current) return;
    gsap.registerPlugin(ScrollTrigger);
    
    const container = refcontainer.current;
    const parent = container as HTMLElement;
    
    // Constants
    const MOBILE_BREAKPOINT = 641;
    const SCROLL_INDICATOR_Y = '85svh';
    
    // Responsive detection
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    
    console.log('haha: ', viewportHeight);

    // Get element dimensions
    const getBoundingRect = (selector: string) => 
      container.querySelector(selector)?.getBoundingClientRect() || { height: 0, top: 0 };
    
    const h1Rect = getBoundingRect('.headline1');
    const shape1Rect = getBoundingRect('.shape1');
    const shape2Rect = getBoundingRect('.shape2');
    const shape3Rect = getBoundingRect('.shape3');
    const contentRect = getBoundingRect('.heroContentWrapper');
    
    console.log('shape1Rect: ', shape1Rect);
    // Calculate dimensions
    const fullHeight = parent.getBoundingClientRect().height || 0;
    const windowContentDiff = viewportHeight - contentRect.height;
    const shapeSpacing = shape2Rect.height * 0.9;
    const shapeStartTop = viewportHeight * 0.2;
    const shapeInitialY = viewportHeight * 0.75;
    
    // Calculate headline positions
    const headlineY = isMobile 
      ? `${viewportCenter - h1Rect.height - 10}` 
      : `${viewportCenter - h1Rect.height / 1.5}`;
    
    const subheadY = isMobile 
      ? `${viewportCenter + 10}` 
      : `${viewportCenter + h1Rect.height / 2}`;
    
    // Calculate shape positions
    const calculateShapeTop = (index: number) => {
      let top = shapeStartTop;
      for (let i = 0; i < index; i++) {
        const rect = i === 0 ? shape1Rect : i === 1 ? shape2Rect : shape3Rect;
        top += rect.height + shapeSpacing;
      }
      return top;
    };
    
    // Set container height
    parent.style.height = `${viewportHeight - windowContentDiff}px`;
    
    // Initial state setup - grouped by element type
    const initialStates = {
      container: { autoAlpha: 1, overflow: 'hidden' },
      headline: {
        display: 'block',
        position: 'fixed',
        autoAlpha: 1,
        y: headlineY,
        zIndex: 3,
        mixBlendMode: 'difference'
      },
      subhead: {
        position: 'fixed',
        y: subheadY
      },
      shapes: {
        position: 'fixed',
        // y: '100svh',
        zIndex: 2
      },
      contentWrapper: {
        position: 'absolute',
        bottom: '0'
      },
      heroContent: {
        autoAlpha: 0,
        yPercent: 10
      },
      scrollIndicator: {
        position: 'fixed',
        y: SCROLL_INDICATOR_Y,
        left: 'var(--spacing-s)'
      }
    };
    
    // Create timeline with ScrollTrigger
    timeline.current = gsap.timeline({ 
      scrollTrigger: {
        trigger: parent,
        start: 'top top',
        end: `+=${fullHeight}px`,
        // end: 'bottom top',
        pin: true,
        scrub: true,
        // markers: process.env.NODE_ENV === 'development',
        id: 'hero-home-scroll',
        invalidateOnRefresh: true
      },
      defaults: { ease: 'none' }
    });
    
    
    // Animation sequence
    const tl = timeline.current;
    // GSDevTools.create({ animation: tl });
    
    // Phase 1: Hide subhead and scroll indicator
    tl.addLabel('init')
      .set('.heroHomeInside', initialStates.container)
      .set('.headline1', initialStates.headline)
      .set('.heroSubhead', initialStates.subhead)
      .set('.shape', initialStates.shapes)
      .set('.heroContentWrapper', initialStates.contentWrapper)
      .set('.heroContent1, .heroContent2', initialStates.heroContent)
      .set('.scrollIndicator', initialStates.scrollIndicator)
      
      // Set individual shape positions
      .set('.shape1', { 
        top: `${shapeStartTop}`, 
        y: `${shapeInitialY}`
      })
      .set('.shape2', { 
        top: `${calculateShapeTop(1)}`, 
        y: `${shapeInitialY}`
      })
      .set('.shape3', { 
        top: `${calculateShapeTop(2)}`, 
        y: `${shapeInitialY}`
      })
      .set('.shape4', { 
        top: `${calculateShapeTop(3)}`, 
        y: `${shapeInitialY}`
      })
      .addLabel('start')
      
      .to('.heroSubhead, .scrollIndicator', {
        yPercent: -50,
        duration: 0.5,
        autoAlpha: 0,
      })
      .addLabel('subHead');
    
    // Phase 2: Animate shapes entering
    const shapesEnter = {
      shape1: { y: 0, duration: 1, ease: 'power2.out' },
      shape2: { y: 0, duration: 0.75, rotate: 45, ease: 'power2.out' },
      shapes34: { y: 0, duration: 0.75, ease: 'none', rotate: 45 }
    };
    
    tl.to('.shape1', shapesEnter.shape1, 'start')
      .addLabel('shape1')
      .to('.shape2', shapesEnter.shape2, 'shape1-=.5')
      .addLabel('shape2')
      .to('.shape3, .shape4', shapesEnter.shapes34, 'shape2-=.5')
      .addLabel('shape3')
    
    // Phase 3: Transform shapes and reveal content
    const exitDistance1 = isMobile ? '-=80svh' : '-=120svh';
    const exitDistance2 = isMobile ? '-=40svh' : '-=0svh';
    const shape4Scale = isMobile ? 6 : 4;
    
    // Calculate absolute final positions
    const parseSvh = (value: string) => {
      const match = value.match(/-?(\d+(?:\.\d+)?)svh/);
      return match ? parseFloat(match[1]) : 0;
    };
    const totalDistance = parseSvh(exitDistance1) + parseSvh(exitDistance2);
    // Use absolute values with fromTo to prevent jump and allow smooth reverse
    const finalExitPosition = `-${totalDistance}svh`;
    const shape4ExitPosition = `-${Math.abs(parseSvh(exitDistance1))}svh`;
    
    // Animate shape4 separately (only moves in first phase, then scales)
    // Use fromTo with immediateRender: false and overwrite to prevent jump and allow smooth reverse
    tl.fromTo('.shape4', 
      { y: 0 },
      {
        y: shape4ExitPosition,
        duration: 1.5,
        ease: 'power2.out',
      }, 'shape3')
      .fromTo('.shape1, .shape2, .shape3',
        { y: 0 },
        {
          y: finalExitPosition,
          duration: 1.5,
          ease: 'power2.out',
        }, 'shape3')
      // Animate headlines separately (they start at a different position)
      .to('.headline1, .headline2', {
        y: finalExitPosition,
        duration: 1.5,
        ease: 'power2.out',
        id: 'exitStart'
      }, 'shape3')
      .fromTo('.shape4', {
        rotate: 45,
        scale: 1,
      },{
        scale: shape4Scale,
        rotate: -30,
        ease: 'power2.in',
        duration: 0.25,
      }, 'shape3+=.125')
      .to('.heroContentWrapper', {
        zIndex: 5,
        duration: 1,
      }, 'shape3')
      .set('.heroHomeInside', {
        backgroundColor: 'var(--color-morpho-teal)',
        height: '100%',
        width: '100%',
      }, 'shape3+=.5')
      .set('.heroContentWrapper', {
        yPercent: 0,
        backgroundColor: 'var(--color-morpho-teal)',
      })
      .to('.heroContent1, .heroContent2', {
        autoAlpha: 1,
        yPercent: 0,
        ease: 'power1.out',
        stagger: 0.1,
        duration: 0.5,
      }, 'shape3+=.5')
      .set('.shape4', { display: 'none' })
      .addLabel('shape4')
      .addLabel('end');
      
  }, { scope: refcontainer });
  
  const data = props.data;
  
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
            <g clipPath="url(#clip0_1_14)">
            <path d="M336.26 296.92C336.29 305.52 335.72 314.06 334.58 322.49C381.23 320.45 425.54 300.95 458.61 267.68C522.34 203.57 621.04 195.52 693.55 243.53C765.16 201.29 858.97 211.03 920.34 272.78C945.97 298.57 978.36 316.08 1013.36 323.61C1007.22 226.04 925.98 148.82 826.79 149.12C776.97 149.27 729.16 129.47 694.04 94.13C680.61 80.61 665.62 69.59 649.65 61.06C615.22 92.59 570.11 110.13 523.21 109.99C419.84 109.68 335.96 193.56 336.27 296.93L336.26 296.92Z" fill="#FFFBF3"/>
            <path d="M109.98 865.93C109.66 969.3 193.55 1053.18 296.92 1052.87C310.38 1052.83 323.7 1054.24 336.65 1057.03C336.39 1052.91 336.27 1048.76 336.28 1044.58C336.43 994.75 316.63 946.94 281.29 911.82C215.35 846.28 208.71 743.74 261.38 670.75C208.7 597.76 215.34 495.21 281.28 429.67C310.52 400.61 329.12 362.87 334.58 322.48C331.68 322.61 328.77 322.67 325.85 322.66C222.48 322.34 138.6 406.23 138.91 509.6C139.06 559.42 119.26 607.23 83.92 642.35C62.74 663.41 47.67 688.28 38.73 714.77C43.67 721.17 49.09 727.32 54.98 733.17C90.32 768.29 110.12 816.1 109.97 865.92L109.98 865.93Z" fill="#FFFBF3"/>
            <path d="M1042.67 509.6C1042.98 406.23 959.1 322.35 855.73 322.66C805.91 322.81 758.1 303.01 722.98 267.67C713.83 258.47 703.96 250.42 693.55 243.52C680.12 251.44 667.48 261.19 655.97 272.77C620.85 308.11 573.04 327.91 523.22 327.76C419.85 327.44 335.97 411.33 336.28 514.7C336.43 564.52 316.63 612.33 281.29 647.45C273.91 654.78 267.27 662.58 261.38 670.75C267.27 678.91 273.91 686.71 281.28 694.04C316.62 729.16 336.42 776.97 336.27 826.79C335.95 930.16 419.83 1014.05 523.21 1013.73C573.03 1013.58 620.84 1033.39 655.96 1068.72C669.39 1082.24 684.38 1093.26 700.36 1101.8C734.79 1070.26 779.9 1052.72 826.8 1052.87C930.17 1053.18 1014.05 969.3 1013.74 865.93C1013.59 816.11 1033.39 768.3 1068.72 733.18C1089.91 712.12 1104.97 687.25 1113.92 660.76C1108.97 654.36 1103.55 648.21 1097.66 642.36C1062.33 607.24 1042.52 559.43 1042.68 509.61L1042.67 509.6ZM946.23 752.55C927.11 771.56 916.39 797.43 916.47 824.39C916.64 880.33 871.25 925.73 815.3 925.56C788.34 925.48 762.46 936.2 743.46 955.32C704.02 995 639.83 995 600.39 955.32C581.38 936.2 555.51 925.48 528.55 925.56C472.61 925.73 427.21 880.34 427.38 824.39C427.46 797.43 416.74 771.55 397.62 752.55C357.94 713.11 357.94 648.92 397.62 609.48C416.74 590.47 427.46 564.6 427.38 537.64C427.21 481.7 472.6 436.3 528.55 436.47C555.51 436.55 581.38 425.83 600.39 406.71C639.83 367.03 704.02 367.03 743.46 406.71C762.47 425.83 788.34 436.55 815.3 436.47C871.24 436.3 916.64 481.69 916.47 537.64C916.39 564.6 927.11 590.48 946.23 609.48C985.91 648.92 985.91 713.11 946.23 752.55Z" fill="#FFFBF3"/>
            <path d="M855.73 1226.42C959.1 1226.73 1042.98 1142.85 1042.67 1039.48C1042.64 1030.88 1043.21 1022.34 1044.35 1013.91C997.7 1015.95 953.39 1035.45 920.33 1068.72C860.89 1128.52 771.01 1139.55 700.35 1101.8C698.2 1103.76 696.1 1105.78 694.04 1107.86C621.17 1181.17 502.54 1181.17 429.67 1107.86C404.04 1082.07 371.65 1064.55 336.65 1057.03C342.79 1154.6 424.03 1231.82 523.22 1231.52C573.04 1231.36 620.85 1251.17 655.97 1286.5C665.12 1295.71 674.99 1303.76 685.4 1310.65C698.83 1302.73 711.47 1292.98 722.98 1281.4C758.1 1246.07 805.91 1226.26 855.73 1226.42Z" fill="#FFFBF3"/>
            <path d="M1240.03 514.7C1240.34 411.33 1156.46 327.45 1053.09 327.76C1039.63 327.8 1026.31 326.38 1013.36 323.6C1013.61 327.72 1013.74 331.87 1013.73 336.05C1013.58 385.87 1033.38 433.68 1068.71 468.8C1120.85 520.62 1135.91 595.57 1113.91 660.75C1170.5 733.99 1165.08 839.7 1097.65 906.72C1068.42 935.78 1049.81 973.52 1044.35 1013.91C1047.25 1013.78 1050.16 1013.73 1053.08 1013.73C1156.45 1014.05 1240.33 930.17 1240.01 826.79C1239.86 776.97 1259.67 729.16 1295 694.04C1302.38 686.7 1309.02 678.91 1314.92 670.74C1309.02 662.58 1302.39 654.78 1295.02 647.45C1259.68 612.33 1239.88 564.52 1240.03 514.7Z" fill="#FFFBF3"/>
            <path d="M523.22 1231.52C424.03 1231.82 342.79 1154.6 336.65 1057.03C323.69 1054.24 310.38 1052.83 296.92 1052.87C193.55 1053.18 109.67 969.3 109.98 865.93C110.13 816.11 90.33 768.3 54.99 733.18C49.1 727.33 43.68 721.18 38.74 714.78C16.73 779.96 31.8 854.91 83.93 906.73C119.27 941.85 139.07 989.66 138.92 1039.49C138.6 1142.86 222.49 1226.74 325.86 1226.43C375.68 1226.27 423.49 1246.08 458.61 1281.41C519.98 1343.16 613.79 1352.9 685.4 1310.66C674.99 1303.77 665.12 1295.72 655.97 1286.51C620.85 1251.18 573.04 1231.37 523.22 1231.53V1231.52Z" fill="#00394C"/>
            <path d="M1013.73 865.93C1014.04 969.3 930.17 1053.18 826.79 1052.87C779.89 1052.72 734.78 1070.26 700.35 1101.8C771.01 1139.55 860.89 1128.52 920.33 1068.72C953.4 1035.45 997.71 1015.95 1044.35 1013.91C1049.81 973.53 1068.42 935.78 1097.65 906.72C1165.08 839.7 1170.5 733.99 1113.91 660.75C1104.96 687.24 1089.9 712.11 1068.71 733.17C1033.38 768.29 1013.58 816.1 1013.73 865.92V865.93Z" fill="#00394C"/>
            <path d="M916.47 537.64C916.64 481.7 871.25 436.3 815.3 436.47C788.34 436.55 762.46 425.83 743.46 406.71C704.02 367.03 639.83 367.03 600.39 406.71C581.38 425.83 555.51 436.55 528.55 436.47C472.61 436.3 427.21 481.69 427.38 537.64C427.46 564.6 416.74 590.48 397.62 609.48C357.94 648.92 357.94 713.11 397.62 752.55C416.74 771.56 427.46 797.43 427.38 824.39C427.21 880.33 472.6 925.73 528.55 925.56C555.51 925.48 581.38 936.2 600.39 955.32C639.83 995 704.02 995 743.46 955.32C762.47 936.2 788.34 925.48 815.3 925.56C871.24 925.73 916.64 880.34 916.47 824.39C916.39 797.43 927.11 771.55 946.23 752.55C985.91 713.11 985.91 648.92 946.23 609.48C927.11 590.47 916.39 564.6 916.47 537.64Z" fill="#00394C"/>
            <path d="M336.28 514.7C335.97 411.33 419.84 327.45 523.22 327.76C573.04 327.91 620.85 308.11 655.97 272.77C667.48 261.19 680.12 251.44 693.55 243.52C621.04 195.5 522.33 203.55 458.61 267.67C425.54 300.94 381.23 320.44 334.58 322.48C329.12 362.86 310.51 400.61 281.28 429.67C215.34 495.21 208.7 597.77 261.38 670.75C267.27 662.58 273.91 654.78 281.29 647.45C316.63 612.33 336.43 564.52 336.28 514.7Z" fill="#00394C"/>
            <path d="M523.2 1013.73C419.83 1014.05 335.95 930.17 336.26 826.79C336.41 776.97 316.61 729.16 281.27 694.04C273.89 686.71 267.26 678.92 261.37 670.75C208.71 743.74 215.34 846.28 281.28 911.82C316.62 946.94 336.42 994.75 336.27 1044.58C336.26 1048.76 336.38 1052.91 336.64 1057.03C371.64 1064.55 404.03 1082.07 429.66 1107.86C502.53 1181.17 621.16 1181.17 694.03 1107.86C696.09 1105.78 698.2 1103.76 700.34 1101.8C684.37 1093.26 669.38 1082.24 655.94 1068.72C620.82 1033.39 573.01 1013.58 523.19 1013.73H523.2Z" fill="#00394C"/>
            <path d="M649.64 61.05C665.61 69.58 680.6 80.61 694.03 94.12C729.15 129.46 776.96 149.26 826.78 149.11C925.97 148.81 1007.21 226.02 1013.35 323.6C1026.3 326.39 1039.62 327.8 1053.08 327.76C1156.45 327.44 1240.33 411.33 1240.02 514.7C1239.87 564.52 1259.67 612.33 1295.01 647.45C1302.38 654.78 1309.01 662.57 1314.91 670.74C1367.57 597.75 1360.93 495.21 1294.99 429.67C1259.66 394.55 1239.85 346.74 1240 296.92C1240.32 193.55 1156.44 109.67 1053.07 109.98C1003.24 110.13 955.44 90.33 920.32 54.99C883.9 18.34 836.05 0.01 788.19 0H788.09C740.23 0.01 692.38 18.34 655.96 54.99C653.9 57.06 651.8 59.08 649.65 61.05H649.64Z" fill="#00394C"/>
            <path d="M1240.01 826.79C1240.33 930.16 1156.45 1014.05 1053.08 1013.73C1050.16 1013.73 1047.25 1013.78 1044.35 1013.91C1043.21 1022.34 1042.64 1030.88 1042.67 1039.48C1042.98 1142.85 959.1 1226.73 855.73 1226.42C805.91 1226.26 758.1 1246.07 722.98 1281.4C711.47 1292.98 698.83 1302.73 685.4 1310.65C757.91 1358.67 856.62 1350.62 920.34 1286.5C955.46 1251.17 1003.27 1231.36 1053.09 1231.52C1156.46 1231.83 1240.34 1147.95 1240.03 1044.58C1239.88 994.75 1259.68 946.94 1295.02 911.82C1360.96 846.28 1367.59 743.72 1314.92 670.74C1309.02 678.91 1302.38 686.71 1295 694.04C1259.67 729.16 1239.86 776.97 1240.01 826.79Z" fill="#00394C"/>
            <path d="M138.92 509.6C138.6 406.23 222.49 322.35 325.86 322.66C328.78 322.66 331.69 322.61 334.59 322.48C335.73 314.06 336.3 305.52 336.27 296.91C335.95 193.54 419.83 109.66 523.21 109.97C570.11 110.11 615.22 92.57 649.65 61.04C578.99 23.29 489.11 34.31 429.67 94.11C394.55 129.45 346.74 149.25 296.92 149.1C193.55 148.79 109.67 232.67 109.98 336.04C110.13 385.86 90.3301 433.67 54.9901 468.79C-12.4399 535.81 -17.8499 641.52 38.7401 714.76C47.6801 688.27 62.7501 663.4 83.9301 642.34C119.27 607.22 139.07 559.41 138.92 509.59V509.6Z" fill="#00394C"/>
            <path d="M693.55 243.52C703.96 250.41 713.83 258.46 722.98 267.67C758.1 303.01 805.91 322.81 855.73 322.66C959.1 322.34 1042.98 406.23 1042.67 509.6C1042.51 559.42 1062.32 607.23 1097.65 642.35C1103.54 648.21 1108.96 654.36 1113.91 660.75C1135.91 595.57 1120.85 520.62 1068.71 468.8C1033.38 433.68 1013.58 385.87 1013.73 336.05C1013.74 331.87 1013.61 327.72 1013.36 323.6C978.36 316.08 945.97 298.56 920.34 272.77C858.97 211.03 765.16 201.28 693.55 243.52Z" fill="#00394C"/>
            </g>
            <defs>
            <clipPath id="clip0_1_14">
            <rect width="1350" height="1341.49" fill="white"/>
            </clipPath>
            </defs>
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
      
      {/* The following is a hack to get the navigation color to change even though all the elements in the heroHome are fixed positioned and so on */}
        <DarkElement>
          <div style={{
            'position': 'relative',
            'marginTop': '-200svh',
            'height': '200svh',
            'width': '100%',
            'opacity': '1' 
          }}>
          </div>
        </DarkElement>
    </div>
  )
}