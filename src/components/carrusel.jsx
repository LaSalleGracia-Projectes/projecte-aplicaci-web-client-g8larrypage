"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { translationsNews } from "@/lang/translations"

export function GalleryWithCarousel({ language }) {
  const newsData = translationsNews[language] || translationsNews['es']
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    { src: "/assets/img/noticia1.png", alt: "Slide 1" },
    { src: "/assets/img/noticia2.png", alt: "Slide 2" },
    { src: "/assets/img/noticia3.jpeg", alt: "Slide 3" },
  ]

  const nextSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [images.length, isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [images.length, isTransitioning])

  const goToSlide = (index) => {
    if (isTransitioning || index === currentImageIndex) return

    setIsTransitioning(true)
    setCurrentImageIndex(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  // Auto-play
  useEffect(() => {
    let interval

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide])

  // Navegar entre imágenes con las flechas del teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [nextSlide, prevSlide])

  return (
    <div className="flex justify-center items-center w-full py-8 px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image container */}
          <div className="relative w-full lg:w-2/3 aspect-[4/3] overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                className={
                  "absolute inset-0 transition-opacity duration-500 ease-in-out " +
                  (currentImageIndex === index ? "opacity-100 z-10" : "opacity-0 z-0")
                }
              >
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover"/>
              </div>
            ))}

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={
                    "w-3 h-3 rounded-full transition-all duration-300 focus:outline-none " +
                    (currentImageIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80")
                  }
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentImageIndex === index ? "true" : "false"}
                />
              ))}
            </div>

            {/* Auto-play toggle */}
            <button
              onClick={toggleAutoPlay}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-3 py-1 text-xs rounded-full z-20 transition-all duration-300"
              aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>

          {/* Content container */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="flex-1 p-6 bg-gray-100">
              <div className="h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{newsData[currentImageIndex].title}</h2>
                <p className="text-gray-700 mb-6">{newsData[currentImageIndex].description}</p>
              </div>
            </div>
            <div className="bg-gray-300 p-4 flex items-center justify-center">
              <p className="text-lg font-bold text-gray-900">{newsData[currentImageIndex].version}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
