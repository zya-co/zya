import { getImageProps } from 'next/image';

const BLUR_WIDTH = 32;
const BLUR_HEIGHT = 24;
const BLUR_QUALITY = 20;

export function getBackgroundBlurImageProps(src: string) {
  return getImageProps({
    src,
    alt: '',
    width: BLUR_WIDTH,
    height: BLUR_HEIGHT,
    quality: BLUR_QUALITY,
  }).props;
}

export function getBackgroundImageProps(src: string) {
  return getImageProps({
    src,
    alt: '',
    fill: true,
    sizes: '100vw',
  }).props;
}
