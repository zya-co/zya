import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { getBackgroundBlurImageProps } from '../../lib/backgroundImageProps';
import styles from './BackgroundImage.module.css';

type BackgroundImageProps = {
  src: string;
  preload?: boolean;
  behind?: boolean;
};

export default function BackgroundImage({ src, preload = false, behind = false }: BackgroundImageProps) {
  const [loaded, setLoaded] = useState(false);
  const figureRef = useRef<HTMLElement>(null);
  const blurProps = useMemo(() => getBackgroundBlurImageProps(src), [src]);

  useEffect(() => {
    setLoaded(false);
    const frame = requestAnimationFrame(() => {
      const img = figureRef.current?.querySelector(`.${styles.image}`);
      if (img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0) {
        setLoaded(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [src]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const figureClassName = [
    styles.figure,
    behind ? styles.figureBehind : '',
  ].filter(Boolean).join(' ');

  return (
    <figure ref={figureRef} className={figureClassName}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...blurProps}
        alt=""
        aria-hidden="true"
        className={styles.blur}
        decoding="async"
      />
      <Image
        src={src}
        alt="Atmospheric background image"
        fill={true}
        sizes="100vw"
        preload={preload}
        onLoad={handleLoad}
        className={`${styles.image} ${loaded ? styles.loaded : ''}`}
      />
    </figure>
  );
}
