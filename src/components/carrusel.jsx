'use client';

import { Carousel } from "@material-tailwind/react";
 
export function GalleryWithCarousel() {
  return (
    <div className="flex justify-center items-center w-full">
      <Carousel
        loop={true}
        autoplay={true}
        transition={{ duration: 1 }}
        className="rounded-xl w-[500px] h-[500px]"
      >
        <img
          src="/assets/img/noticia1.png"
          alt="image 1"
          className="w-full h-full object-cover"
        />
        <img
          src="/assets/img/noticia2.png"
          alt="image 2"
          className="w-full h-full object-cover"
        />
        <img
          src="/assets/img/noticia3.jpeg"
          alt="image 3"
          className="w-full h-full object-cover"
        />
      </Carousel>
    </div>
  );
}
