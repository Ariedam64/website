"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarousselProps {
  images: string[];
  className?: string;
}

export default function Caroussel({ images, className }: CarousselProps) {
  return (
    <div className={`w-full rounded-xl flex justify-center ${className}`}>
      <Swiper 
        modules={[Navigation, Pagination]}
        navigation={true}
        rewind={true}
        pagination= {{dynamicBullets: true, clickable: true}}
        observer={true}
        observeParents={true}
        autoHeight={true}  
        centeredSlides={true}
        grabCursor={true}
        className=" w-full rounded-2xl"
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
