"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';

const Gallery = () => {
  const images = [
    {
      src: "/images/img1.jpg",
      alt: "Hotel Exterior View"
    },
    {
      src: "/images/img1.jpg", 
      alt: "Deluxe Room"
    },
    {
      src: "/images/img1.jpg",
      alt: "Restaurant Area"
    },
    {
      src: "/images/img1.jpg",
      alt: "Lobby"
    },
    {
      src: "/images/img1.jpg",
      alt: "Suite Room"
    },
    {
      src: "/images/img1.jpg",
      alt: "Garden View"
    }
  ];

  return (
    <section id="gallery" className="py-12 md:py-20 bg-[#F5EBE0] border-l-[10px] border-r-[10px] border-b-[10px] border-[#8B593E]">
      <div className="w-full lg:max-w-[1300px] mx-auto px-4 md:px-6">
        <header className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-neutral-800">
            Our <span className="text-[#8B593E] ">Gallery</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed px-4">
            Take a visual journey through our elegant spaces and discover the perfect setting for your stay.
          </p>
        </header>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            },
          }}
          className="[&_.swiper-pagination-bullet]:bg-[#8B593E] [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:mx-1.5 
                     [&_.swiper-pagination-bullet-active]:bg-[#8B593E] [&_.swiper-pagination-bullet-active]:w-2.5 [&_.swiper-pagination-bullet-active]:h-2.5
                     sm:[&_.swiper-pagination-bullet]:w-1.5 sm:[&_.swiper-pagination-bullet]:h-1.5 sm:[&_.swiper-pagination-bullet]:mx-1
                     sm:[&_.swiper-pagination-bullet-active]:w-2 sm:[&_.swiper-pagination-bullet-active]:h-2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden border-4 border-[#8B593E]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end">
                  <p className="text-white p-3 md:p-4 text-base md:text-lg font-medium">{image.alt}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
