"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function F1Divider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("f1-drive-active");
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="f1-divider" aria-hidden="true">
      <div className="f1-track" />
      <div className="f1-car-wrapper">
        <Image
          src="/images/f1-car-divider.jpg"
          alt=""
          width={500}
          height={140}
          className="f1-car-image"
          priority
        />
      </div>
      <div className="f1-track-line" />
    </div>
  );
}
