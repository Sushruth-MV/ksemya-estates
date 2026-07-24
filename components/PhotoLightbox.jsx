"use client";
import { useCallback, useEffect, useState } from "react";

export default function PhotoLightbox({ images, title }) {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, showPrev, showNext]);

  if (images.length === 0) {
    return (
      <div className="col-span-2 aspect-video bg-mist border border-cream/10 rounded-lg flex items-center justify-center text-cream/30">
        No photos yet
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`group relative rounded-lg overflow-hidden border border-cream/10 ${
              i === 0 ? "col-span-2 aspect-video" : "aspect-square"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} photo ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center animate-fade-in-up"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-cream flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 md:left-6 w-11 h-11 rounded-full bg-white/10 text-cream flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
                className="absolute right-3 md:right-6 w-11 h-11 rounded-full bg-white/10 text-cream flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                →
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[openIndex]}
            alt={`${title} photo ${openIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[86vh] object-contain rounded-lg"
          />

          {images.length > 1 && (
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-cream/70 text-sm bg-black/40 px-3 py-1 rounded-pill">
              {openIndex + 1} / {images.length}
            </span>
          )}
        </div>
      )}
    </>
  );
}
