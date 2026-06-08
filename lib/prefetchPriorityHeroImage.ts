import { getImageProps } from 'next/image';

/** Routes whose first dynamic block uses bgImgPriority + bgImage */
const PRIORITY_HERO_IMAGES: Record<string, string> = {
  '/team': '/media/plants-bg-02.webp',
};

const prefetched = new Set<string>();

export function prefetchPriorityHeroImage(href: string) {
  if (typeof window === 'undefined') return;

  const path = href.split('#')[0].split('?')[0];
  const imageSrc = PRIORITY_HERO_IMAGES[path];
  if (!imageSrc || prefetched.has(path)) return;

  prefetched.add(path);

  const { props } = getImageProps({
    src: imageSrc,
    alt: '',
    fill: true,
    sizes: '100vw',
  });

  const img = new window.Image();
  if (props.srcSet) {
    img.sizes = props.sizes ?? '100vw';
    img.srcset = props.srcSet;
  }
  img.src = props.src;
}

export function getHeroPrefetchHandlers(href: string) {
  return {
    onMouseEnter: () => prefetchPriorityHeroImage(href),
    onFocus: () => prefetchPriorityHeroImage(href),
    onTouchStart: () => prefetchPriorityHeroImage(href),
  };
}
