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
}

export default function Caroussel({ images = [], className = "" }: CarousselProps) {
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
        autoHeight
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
            <div className="w-auto h-auto flex justify-center items-center">
              <Image
                src={src}
                alt={`Illustration ${index + 1}`}
                width={800}
                height={450}
                unoptimized
                className="rounded-xl object-contain w-auto h-auto mx-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
