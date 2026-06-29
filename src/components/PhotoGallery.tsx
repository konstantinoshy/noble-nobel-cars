"use client";

import { useState } from "react";
import Image from "next/image";
import type { CarImage } from "@/lib/types/database";
import { useTranslations } from "next-intl";

interface PhotoGalleryProps {
  images: CarImage[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const t = useTranslations("CarDetail");
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-100">
        <Image
          src={images[activeIndex].url}
          alt={`Car photo ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
          priority
        />
      </div>

      {/* Thumbnails */}
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
  );
}
