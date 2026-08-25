"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarousselProps {
  images?: readonly string[];
  className?: string;
  /** Hauteur du cadre. Les captures paysage se contentent du défaut ; les
   *  captures d'écran de téléphone ont besoin d'un cadre plus haut pour rester
   *  lisibles, sans quoi elles s'affichent en filet vertical. */
  frameHeight?: FrameHeight;
}

export type FrameHeight = "wide" | "compact" | "portrait";

/**
 * Cadre à hauteur fixe : toutes les slides d'un carrousel ont la même hauteur
 * quel que soit le ratio de l'image source, ce qui évite les sauts de layout.
 *
 * La hauteur est calée sur la résolution des captures du module. Sur un écran
 * haute densité, une image affichée plus large que la moitié de sa largeur
 * source est étirée, donc floue. Les plafonds ci-dessous sont ceux qui gardent
 * chaque famille de captures nette.
 */
const FRAME_HEIGHTS: Record<FrameHeight, string> = {
  /** Captures d'écran ~1920px de large. */
  wide: "clamp(200px, 40vw, 457px)",
  /** Captures d'écran ~800 à 1080px de large. */
  compact: "clamp(180px, 32vw, 350px)",
  /** Captures de téléphone, 1080x2340. */
  portrait: "clamp(320px, 80vw, 700px)",
};

/**
 * Largeur réellement peinte par variante, arrondie au-dessus. Annoncer une
 * largeur trop grande fait télécharger une image inutilement lourde ; trop
 * petite, le navigateur choisit une source insuffisante et l'image est floue.
 */
const IMAGE_SIZES: Record<FrameHeight, string> = {
  wide: "(max-width: 768px) 100vw, 1040px",
  compact: "(max-width: 768px) 100vw, 720px",
  portrait: "(max-width: 768px) 60vw, 360px",
};

export default function Caroussel({
  images = [],
  className = "",
  frameHeight = "compact",
}: CarousselProps) {
  if (images.length === 0) {
    return <div className={`w-full rounded-xl flex justify-center ${className}`} />;
  }

  return (
    <div className={`w-full rounded-xl flex justify-center ${className}`}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        rewind
        pagination={{ dynamicBullets: true, clickable: true }}
        observer
        observeParents
        centeredSlides
        grabCursor
        className="w-full rounded-2xl"
        style={{
          "--swiper-navigation-color": "#BB86FC",
          "--swiper-pagination-color": "#BB86FC",
          "--swiper-pagination-bullet-inactive-color": "#BB86FC"
        } as React.CSSProperties}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="relative w-full" style={{ height: FRAME_HEIGHTS[frameHeight] }}>
              <Image
                src={src}
                alt={`Illustration ${index + 1}`}
                fill
                sizes={IMAGE_SIZES[frameHeight]}
                className="rounded-xl object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
