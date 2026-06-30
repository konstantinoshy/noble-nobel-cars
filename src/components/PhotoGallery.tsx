"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { CarImage } from "@/lib/types/database";
import { useTranslations } from "next-intl";

interface PhotoGalleryProps {
  images: CarImage[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const t = useTranslations("CarDetail");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ---- Lightbox zoom & pan state ----
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef<number | null>(null);

  // ---- Swipe tracking ----
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const resetTransform = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const openLightbox = useCallback(
    (idx: number) => {
      setActiveIndex(idx);
      resetTransform();
      setLightboxOpen(true);
    },
    [resetTransform]
  );

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    resetTransform();
  }, [resetTransform]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
    resetTransform();
  }, [images.length, resetTransform]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
    resetTransform();
  }, [images.length, resetTransform]);

  // ---- Keyboard navigation ----
  useEffect(() => {
    if (!lightboxOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  // ---- Lock body scroll when lightbox is open ----
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // ---- Scroll-to-zoom (desktop) ----
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.stopPropagation();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setScale((s) => {
        const next = Math.min(Math.max(s + delta, 1), 5);
        if (next === 1) setTranslate({ x: 0, y: 0 });
        return next;
      });
    },
    []
  );

  // ---- Mouse drag (desktop pan) ----
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { ...translate };
    },
    [scale, translate]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setTranslate({
        x: translateStart.current.x + (e.clientX - dragStart.current.x),
        y: translateStart.current.y + (e.clientY - dragStart.current.y),
      });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ---- Touch: swipe navigation + pinch-to-zoom ----
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch start
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist.current = Math.hypot(dx, dy);
        touchStart.current = null; // cancel swipe if pinching
      } else if (e.touches.length === 1) {
        if (scale > 1) {
          // Panning when zoomed
          setIsDragging(true);
          dragStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          };
          translateStart.current = { ...translate };
        } else {
          // Swipe start
          touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          };
        }
      }
    },
    [scale, translate]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        if (lastPinchDist.current !== null) {
          const delta = (dist - lastPinchDist.current) * 0.01;
          setScale((s) => {
            const next = Math.min(Math.max(s + delta, 1), 5);
            if (next === 1) setTranslate({ x: 0, y: 0 });
            return next;
          });
        }
        lastPinchDist.current = dist;
      } else if (e.touches.length === 1 && isDragging && scale > 1) {
        // Pan when zoomed
        setTranslate({
          x:
            translateStart.current.x +
            (e.touches[0].clientX - dragStart.current.x),
          y:
            translateStart.current.y +
            (e.touches[0].clientY - dragStart.current.y),
        });
      }
    },
    [isDragging, scale]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      lastPinchDist.current = null;
      setIsDragging(false);

      // Swipe detection (only when not zoomed)
      if (scale <= 1 && touchStart.current && e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Require at least 50px horizontal, and more horizontal than vertical
        if (absDx > 50 && absDx > absDy * 1.5) {
          if (dx < 0) goNext();
          else goPrev();
        }
      }
      touchStart.current = null;
    },
    [scale, goNext, goPrev]
  );

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-surface-100 text-surface-400">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <p className="mt-2 text-sm">{t("noImages")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image — click to open lightbox */}
        <button
          onClick={() => openLightbox(activeIndex)}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface-100 cursor-zoom-in group"
          aria-label="Open fullscreen gallery"
        >
          <Image
            src={images[activeIndex].url}
            alt={`Car photo ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          {/* Zoom hint icon */}
          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
          {/* Counter badge */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </button>

        {/* Thumbnails — unchanged */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-lg transition-all ${
                  idx === activeIndex
                    ? "ring-2 ring-primary-500 ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ======== Fullscreen Lightbox ======== */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={(e) => {
            // Close only if clicking the backdrop (not the image or controls)
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white tabular-nums">
              {activeIndex + 1} / {images.length}
            </div>
          )}

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Zoomable image container */}
          <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden select-none"
            style={{ touchAction: "none" }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="relative h-[80vh] w-[90vw] max-w-5xl transition-transform duration-100"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                cursor: scale > 1 ? "grab" : "default",
              }}
            >
              <Image
                src={images[activeIndex].url}
                alt={`Car photo ${activeIndex + 1}`}
                fill
                sizes="90vw"
                className="object-contain pointer-events-none"
                priority
              />
            </div>
          </div>

          {/* Zoom hint */}
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/60">
            <span className="hidden md:inline">Scroll to zoom · Drag to pan</span>
            <span className="md:hidden">Pinch to zoom · Swipe to navigate</span>
          </div>
        </div>
      )}
    </>
  );
}
