import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DynamicBlock.module.css';

type BackgroundImageProps = {
  src: string;
  preload?: boolean;
};

export default function BackgroundImage({ src, preload = false }: BackgroundImageProps) {
  const [loaded, setLoaded] = useState(false);
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setLoaded(false);
    const frame = requestAnimationFrame(() => {
      const img = figureRef.current?.querySelector('img');
      if (img?.complete && img.naturalWidth > 0) {
        setLoaded(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [src]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <figure ref={figureRef} className={styles.bgImage}>
      <Image
        src={src}
        alt="Atmospheric background image"
        fill={true}
        sizes="100vw"
        preload={preload}
        onLoad={handleLoad}
        className={`${styles.bgImageImg} ${loaded ? styles.bgImageLoaded : ''}`}
      />
    </figure>
  );
}
