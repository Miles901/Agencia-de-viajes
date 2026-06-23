"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface DestinationGalleryProps {
  images: string[];
  name: string;
}

export function DestinationGallery({ images, name }: DestinationGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  };
  const showNext = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className={`relative overflow-hidden rounded-xl group ${
              index === 0 ? "col-span-2 row-span-2 h-48 md:h-full" : "h-32 md:h-40"
            }`}
            aria-label={`Ver foto ${index + 1} de ${name}`}
          >
            <img
              src={img || "/placeholder.svg"}
              alt={`${name} foto ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-background hover:text-background/70 transition-colors"
            aria-label="Cerrar galeria"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 text-background hover:text-background/70 transition-colors"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <img
            src={images[lightboxIndex] || "/placeholder.svg"}
            alt={`${name} foto ${lightboxIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 text-background hover:text-background/70 transition-colors"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <span className="absolute bottom-6 text-background/80 text-sm">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
