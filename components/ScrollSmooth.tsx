import { gsap } from "gsap/dist/gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react/dist";
import { useRef } from "react";
import { useRouter } from "next/compat/router";

const getHashFromUrl = (url: string) => {
  const hashIndex = url.indexOf('#');
  if (hashIndex === -1) return null;
  const hash = url.slice(hashIndex + 1);
  return hash || null;
};

const scrollToHashInstant = (
  smoother: ScrollSmoother,
  hash: string,
  contentRoot: Element,
  onDone?: () => void,
) => {
  let observer: MutationObserver | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const cleanup = () => {
    observer?.disconnect();
    observer = null;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    smoother.paused(false);
  };

  const jumpToHash = () => {
    const hashElement = document.getElementById(hash);
    if (!hashElement) return false;

    smoother.paused(true);
    smoother.scrollTo(hashElement, false);
    ScrollTrigger.refresh();
    smoother.paused(false);
    cleanup();
    onDone?.();
    return true;
  };

  if (jumpToHash()) return cleanup;

  observer = new MutationObserver(() => {
    jumpToHash();
  });
  observer.observe(contentRoot, { childList: true, subtree: true });

  timeoutId = setTimeout(cleanup, 5000);

  return cleanup;
};

export const ScrollSmooth = (props) => {
  
  const router = useRouter();
  const smoothRef = useRef<HTMLDivElement>(null);
  const smoothScrollerRef = useRef<ScrollSmoother | null>(null);
  const hashScrollCleanupRef = useRef<(() => void) | null>(null);
  
  useGSAP((context, contextSafe)=> {

    if(!smoothRef.current || typeof window === 'undefined') return;

    // Register plugins on client side only
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    let smoothContent = smoothRef.current.querySelector("#smooth-content");
    
    if (!smoothContent) return;
    
    smoothScrollerRef.current = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 1,
      normalizeScroll: true,
      wrapper: smoothRef.current,
      content: smoothContent,
      ignoreMobileResize: true,
    });

    const initialHash = getHashFromUrl(`${window.location.pathname}${window.location.hash}`);
    if (initialHash) {
      hashScrollCleanupRef.current?.();
      hashScrollCleanupRef.current = scrollToHashInstant(
        smoothScrollerRef.current,
        initialHash,
        smoothContent,
      );
    } else {
      smoothScrollerRef.current.scrollTop(0);
    }
  }, {
    scope: smoothRef, 
    // revertOnUpdate: true
  });

  useGSAP((context, contextSafe) => {
    if (!router) return;

    const handleRouteChangeStart = contextSafe((url: string) => {
      if (getHashFromUrl(url)) {
        smoothScrollerRef.current?.paused(true);
      }
    });

    const handleRouteChangeComplete = contextSafe((url: string) => {
      const smoother = smoothScrollerRef.current;
      const contentRoot = smoothRef.current?.querySelector("#smooth-content");
      if (!smoother || !contentRoot) return;

      hashScrollCleanupRef.current?.();
      hashScrollCleanupRef.current = null;

      const hash = getHashFromUrl(url);
      if (hash) {
        hashScrollCleanupRef.current = scrollToHashInstant(smoother, hash, contentRoot);
      } else {
        smoother.scrollTop(0);
        ScrollTrigger.refresh();
      }
    });

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      hashScrollCleanupRef.current?.();
      hashScrollCleanupRef.current = null;
    }
  }, {
    scope: smoothRef,
    dependencies: [router]
  });

  return (
    <>
      <div id="smooth-wrapper" ref={smoothRef}>
        <div id="smooth-content" style={{'willChange': 'transform', width: '100vw'}}>
          {props.children}
        </div>
      </div>
    </>
  )
}
