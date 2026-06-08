import { gsap } from 'gsap/dist/gsap';
import { useGSAP } from '@gsap/react/dist';
import { RefObject, useLayoutEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

const MOBILE_BREAKPOINT = 640;

const LINK_LABELS = ['one', 'two', 'four', 'six', 'seven'] as const;

function getLinkAnimLabel(i: number) {
  return LINK_LABELS[i] ?? 'null';
}

function linkMatchesPage(link: HTMLAnchorElement, page: string) {
  if (!page) return false;
  const path = link.getAttribute('href') ?? link.pathname;
  return path === `/${page}` || path.endsWith(`/${page}`);
}

export function useNavigationHover(
  container: RefObject<HTMLElement | null>,
  currentPage: string,
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [measureKey, setMeasureKey] = useState(0);

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth <= MOBILE_BREAKPOINT) return;

    let cancelled = false;
    let debounceId: ReturnType<typeof setTimeout>;

    const syncLayout = () => {
      if (cancelled || window.innerWidth <= MOBILE_BREAKPOINT) return;
      setMeasureKey((key) => key + 1);
    };

    const scheduleSync = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(syncLayout);
      });
    };

    scheduleSync();
    document.fonts?.ready.then(scheduleSync);

    const linkList = container.current
      ?.querySelector('.mainNav__linkList__link')
      ?.parentElement;

    const resizeObserver = linkList
      ? new ResizeObserver(() => {
          clearTimeout(debounceId);
          debounceId = setTimeout(syncLayout, 100);
        })
      : null;

    if (linkList && resizeObserver) {
      resizeObserver.observe(linkList);
    }

    window.addEventListener('resize', syncLayout);

    return () => {
      cancelled = true;
      clearTimeout(debounceId);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', syncLayout);
    };
  }, [container]);

  useGSAP(
    (context, contextSafe) => {
      if (!measureKey || window.innerWidth <= MOBILE_BREAKPOINT) return;

      const nav = container.current ?? document.querySelector('.mainNav');
      if (!nav) return;

      const circWidthVw = 2.3;
      const circdist = 45;
      const maxgroupWidth = circWidthVw + (circWidthVw * circdist * 2) / 100;
      const windowWidth = window.innerWidth;

      const navBarHeight = nav.getBoundingClientRect().height || 0;
      const navRect = nav.getBoundingClientRect();

      const originX = windowWidth / 2.5;
      const originW = (maxgroupWidth / 100) * windowWidth;
      const originY = 0.5 * navBarHeight;

      const links = Array.from(
        nav.querySelectorAll('.mainNav__linkList__link'),
      ) as HTMLAnchorElement[];

      const calcX = (linkRect: DOMRect) =>
        linkRect.left +
        linkRect.width / 2 -
        navRect.left -
        originX -
        originW / 2;

      const linkRects = links.map((link) => link.getBoundingClientRect());

      const null_x = calcX(linkRects[0]);
      const one_x = calcX(linkRects[0]);
      const two_x = calcX(linkRects[1]);
      const four_x = calcX(linkRects[2]);
      const six_x = calcX(linkRects[3]);
      const seven_x = calcX(linkRects[4]);

      let circleGroup = nav.querySelector('.mainNavHoverCircleGroup') as HTMLElement | null;

      if (!circleGroup) {
        circleGroup = document.createElement('div');
        circleGroup.classList.add('mainNavHoverCircleGroup');
        nav.appendChild(circleGroup);

        for (let i = 0; i < 7; i++) {
          const circle = document.createElement('div');
          circle.classList.add('mainNavHoverCircle');
          circleGroup.appendChild(circle);
        }
      }

      gsap.set(circleGroup, {
        position: 'absolute',
        left: originX,
        top: originY,
        width: originW,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: -1,
        x: 0,
        y: 0,
        rotate: 0,
        autoAlpha: 0,
      });

      gsap.set(nav.querySelectorAll('.mainNavHoverCircle'), {
        backgroundColor: 'var(--color-fuchsia)',
        width: `${circWidthVw}vw`,
        height: `${circWidthVw}vw`,
        borderRadius: '50%',
        position: 'absolute',
      });

      tlRef.current?.kill();
      tlRef.current = gsap.timeline({
        paused: true,
        defaults: { ease: 'none', duration: 1 },
      });

      const tl = tlRef.current;
      const origin = `${50 + circdist}% 50%`;

      tl.addLabel('null')
        .to(circleGroup, { rotate: 0, y: 0, x: null_x, autoAlpha: 0 }, 'null')
        .to('.mainNavHoverCircle:nth-child(1)', { transformOrigin: origin, xPercent: 0, rotate: 0 }, 'null')
        .to('.mainNavHoverCircle:not(:nth-child(1))', { transformOrigin: origin, xPercent: 0, rotate: 0 }, 'null')

        .addLabel('one')
        .to(circleGroup, {
          rotate: 45,
          y: 0.125 * navBarHeight,
          x: one_x,
          autoAlpha: 1,
        }, 'one')
        .to('.mainNavHoverCircle:nth-child(1)', { transformOrigin: origin, xPercent: -circdist, rotate: 0 }, 'one')
        .to('.mainNavHoverCircle:not(:nth-child(1))', { transformOrigin: origin, xPercent: -circdist, rotate: 90 }, 'one')

        .addLabel('two')
        .to(circleGroup, { y: 0, rotate: 0, x: two_x, autoAlpha: 1 }, 'two')
        .to('.mainNavHoverCircle:nth-child(1)', { rotate: 0 }, 'two')
        .to('.mainNavHoverCircle:nth-child(2)', { rotate: 90 }, 'two')
        .to('.mainNavHoverCircle:nth-child(3)', { rotate: 180 }, 'two')
        .to('.mainNavHoverCircle:nth-child(4)', { rotate: 270 }, 'two')
        .to('.mainNavHoverCircle:nth-child(5)', { rotate: 270 }, 'two')
        .to('.mainNavHoverCircle:nth-child(6)', { rotate: 270 }, 'two')
        .to('.mainNavHoverCircle:nth-child(7)', { rotate: 270 }, 'two')

        .addLabel('four')
        .to(circleGroup, { y: 0, rotate: 0, x: four_x, autoAlpha: 1 }, 'four')
        .to('.mainNavHoverCircle:nth-child(1)', { rotate: 0 }, 'four')
        .to('.mainNavHoverCircle:nth-child(2)', { rotate: 60 }, 'four')
        .to('.mainNavHoverCircle:nth-child(3)', { rotate: 120 }, 'four')
        .to('.mainNavHoverCircle:nth-child(4)', { rotate: 180 }, 'four')
        .to('.mainNavHoverCircle:nth-child(5)', { rotate: 240 }, 'four')
        .to('.mainNavHoverCircle:nth-child(6)', { rotate: 300 }, 'four')
        .to('.mainNavHoverCircle:nth-child(7)', { rotate: 300 }, 'four')

        .addLabel('six')
        .to(circleGroup, { y: 0, rotate: 0, x: six_x, autoAlpha: 1 }, 'six')
        .to('.mainNavHoverCircle:nth-child(1)', { rotate: 0 }, 'six')
        .to('.mainNavHoverCircle:nth-child(2)', { rotate: 51.4 }, 'six')
        .to('.mainNavHoverCircle:nth-child(3)', { rotate: 102.8 }, 'six')
        .to('.mainNavHoverCircle:nth-child(4)', { rotate: 154.3 }, 'six')
        .to('.mainNavHoverCircle:nth-child(5)', { rotate: 205.7 }, 'six')
        .to('.mainNavHoverCircle:nth-child(6)', { rotate: 257.1 }, 'six')
        .to('.mainNavHoverCircle:nth-child(7)', { rotate: 308.6 }, 'six')

        .addLabel('seven')
        .to(circleGroup, { y: 0, rotate: 0, x: seven_x, autoAlpha: 1 }, 'seven');

      const currentUri = currentPage;
      const pageInNav = links.some((link) => linkMatchesPage(link, currentUri));
      let currentLink = -1;

      // Each label starts a 1s tween segment; seek/tween to the end of the segment
      // so the fully-applied state is shown (not the previous label's end state).
      const getLabelEndTime = (label: string) => {
        const labelTime = tl.labels[label];
        if (labelTime === undefined) return 0;
        const nextLabelTime = Object.values(tl.labels)
          .filter((time) => time > labelTime)
          .sort((a, b) => a - b)[0];
        return nextLabelTime !== undefined ? nextLabelTime - 0.001 : labelTime + 0.999;
      };

      const seekToLabel = (label: string) => {
        tl.seek(getLabelEndTime(label)).pause();
      };

      const tweenToLabel = (label: string, vars: gsap.TweenVars = {}) => {
        tl.tweenTo(getLabelEndTime(label), vars);
      };

      if (!currentUri || !pageInNav) {
        seekToLabel('null');
      } else {
        links.forEach((link, i) => {
          if (linkMatchesPage(link, currentUri)) {
            currentLink = i;
          }
        });
        if (currentLink >= 0) {
          seekToLabel(getLinkAnimLabel(currentLink));
        }
      }

      requestAnimationFrame(() => {
        if (currentLink >= 0) {
          seekToLabel(getLinkAnimLabel(currentLink));
        } else if (!currentUri || !pageInNav) {
          seekToLabel('null');
        }
      });

      const onEnterClickHandler = contextSafe((event: MouseEvent) => {
        const link = event.currentTarget as HTMLAnchorElement & {
          _mouseLeaveHandler?: (event: MouseEvent) => void;
        };
        link.removeEventListener('mouseleave', link._mouseLeaveHandler!);
        const i = links.indexOf(link);
        if (i >= 0) seekToLabel(getLinkAnimLabel(i));
      });

      const mouseEnterHandler = contextSafe((event: MouseEvent) => {
        const link = event.currentTarget as HTMLAnchorElement;
        const i = links.indexOf(link);
        if (i >= 0) {
          tweenToLabel(getLinkAnimLabel(i), { duration: 0.5, ease: 'power2.inOut' });
        }
      });

      const mouseLeaveHandler = contextSafe((event: MouseEvent) => {
        const link = event.currentTarget as HTMLAnchorElement;
        if (linkMatchesPage(link, currentUri) && currentLink !== -1) return;

        tweenToLabel(
          currentLink >= 0 ? getLinkAnimLabel(currentLink) : 'null',
          { duration: 0.5, ease: 'power2.inOut' },
        );
      });

      links.forEach((link) => {
        if (link._mouseEnterHandler && link._mouseLeaveHandler && link._clickHandler) {
          link.removeEventListener('mouseenter', link._mouseEnterHandler);
          link.removeEventListener('mouseleave', link._mouseLeaveHandler);
          link.removeEventListener('click', link._clickHandler);
        }
      });

      if (!currentUri || !pageInNav) {
        links.forEach((link) => {
          link.addEventListener('mouseenter', mouseEnterHandler);
          link.addEventListener('mouseleave', mouseLeaveHandler);
          link.addEventListener('click', onEnterClickHandler);
          link._mouseEnterHandler = mouseEnterHandler;
          link._mouseLeaveHandler = mouseLeaveHandler;
          link._clickHandler = onEnterClickHandler;
        });
      } else {
        links.forEach((link) => {
          if (linkMatchesPage(link, currentUri)) return;

          link.addEventListener('mouseenter', mouseEnterHandler);
          link.addEventListener('mouseleave', mouseLeaveHandler);
          link.addEventListener('click', onEnterClickHandler);
          link._mouseEnterHandler = mouseEnterHandler;
          link._mouseLeaveHandler = mouseLeaveHandler;
          link._clickHandler = onEnterClickHandler;
        });
      }

      return () => {
        links.forEach((link) => {
          if (link._mouseEnterHandler && link._mouseLeaveHandler && link._clickHandler) {
            link.removeEventListener('mouseenter', link._mouseEnterHandler);
            link.removeEventListener('mouseleave', link._mouseLeaveHandler);
            link.removeEventListener('click', link._clickHandler);
          }
        });
        tlRef.current?.kill();
        tlRef.current = null;
      };
    },
    { scope: container, dependencies: [measureKey, currentPage] },
  );
}

export default useNavigationHover;
